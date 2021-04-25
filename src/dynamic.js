/**
 * Copyright (c) 2019-2021 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

import { flat } from './polyfills'
import { clearIntervalAsync } from './clear'
import SetIntervalAsyncError from './error'
import SetIntervalAsyncTimer from './timer'
import { getNextIterationId, noop } from './util'
import { validateHandler, validateInterval } from './validation'

/**
 * Attempts to execute the given handler at regular intervals, while preventing<br>
 * multiple concurrent executions. The handler will never be executed concurrently<br>
 * more than once in any given moment. If the running time of any execution exceeds<br>
 * the desired interval, the following execution will be scheduled as soon as<br>
 * possible; ie. immediately after the previous execution concludes.
 *
 * @param {function} handler - Handler function to be executed in intervals.<br>
 *                             May be asynchronous.
 * @param {number|Array} interval - Interval in milliseconds. Must be at least 10 ms. First array index is initial delay.
 * @param {...*} args - Any number of arguments to pass on to the handler.
 * @returns {SetIntervalAsyncTimer}
 *          A timer object which can be used to stop execution with {@link clearIntervalAsync}.
 *
 * @alias [Dynamic] setIntervalAsync
 */
function setIntervalAsync (handler, interval, ...args) {
  validateHandler(handler)
  validateInterval(interval)
  const timer = new SetIntervalAsyncTimer()
  const iterationId = 0
  const intervals = flat([interval])
  timer.timeouts[iterationId] = setTimeout(
    timeoutHandler,
    intervals[0],
    timer,
    iterationId,
    handler,
    intervals[1] || intervals[0],
    ...args
  )
  return timer
}

/**
 * @private
 *
 * @param {SetIntervalAsyncTimer} timer
 * @param {number} iterationId
 * @param {function} handler
 * @param {number} interval
 * @param {...*} args
 */
function timeoutHandler (timer, iterationId, handler, interval, ...args) {
  delete timer.timeouts[iterationId]
  timer.promises[iterationId] = runHandler(
    timer,
    iterationId,
    handler,
    interval,
    ...args
  )
}

/**
 * @private
 *
 * @param {SetIntervalAsyncTimer} timer
 * @param {number} iterationId
 * @param {function} handler
 * @param {number} interval
 * @param {...*} args
 */
async function runHandler (timer, iterationId, handler, interval, ...args) {
  // The next line ensures that timer.promises[iterationId] is set
  // before running the handler.
  await noop()
  const startTime = new Date()
  try {
    await handler(...args)
  } finally {
    if (!timer.stopped) {
      const endTime = new Date()
      const executionTime = endTime - startTime
      const timeout = interval > executionTime
        ? interval - executionTime
        : 0
      const nextIterationId = getNextIterationId(iterationId)
      timer.timeouts[nextIterationId] = setTimeout(
        timeoutHandler,
        timeout,
        timer,
        nextIterationId,
        handler,
        interval,
        ...args
      )
    }
    delete timer.promises[iterationId]
  }
}

export { setIntervalAsync, clearIntervalAsync, SetIntervalAsyncTimer, SetIntervalAsyncError }
