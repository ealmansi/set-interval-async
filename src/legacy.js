/**
 * Copyright (c) 2019-2021 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

import { clearIntervalAsync } from './clear'
import SetIntervalAsyncError from './error'
import SetIntervalAsyncTimer from './timer'
import { getNextIterationId, noop } from './util'
import { validateHandler, validateInterval } from './validation'

/**
 * Executes the given handler at fixed intervals; ie. the start time<br>
 * between consecutive executions is always a fixed amount of time.<br>
 * If a given execution takes longer than the given time interval to<br>
 * complete, then the handler will be invoked again without waiting<br>
 * for the previous one to finish. In this scenario, multiple concurrent<br>
 * executions can and will ocurr, so this function should only be used<br>
 * when the given handler is reentrancy-safe.
 *
 * @param {function} handler - Handler function to be executed in intervals.<br>
 *                             May be asynchronous.
 * @param {number|Array} interval - Interval in milliseconds. Must be at least 10 ms. First array index is initial delay.
 * @param {...*} args - Any number of arguments to pass on to the handler.
 * @returns {SetIntervalAsyncTimer}
 *          A timer object which can be used to stop execution with {@link clearIntervalAsync}.
 *
 * @alias [Legacy] setIntervalAsync
 */
function setIntervalAsync (handler, interval, ...args) {
  validateHandler(handler)
  validateInterval(interval)
  const timer = new SetIntervalAsyncTimer()
  const iterationId = 0
  const intervals = [interval].flat()
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
  const nextIterationId = getNextIterationId(iterationId)
  timer.timeouts[nextIterationId] = setTimeout(
    timeoutHandler,
    interval,
    timer,
    nextIterationId,
    handler,
    interval,
    ...args
  )
  try {
    await handler(...args)
  } finally {
    delete timer.promises[iterationId]
  }
}

export { setIntervalAsync, clearIntervalAsync, SetIntervalAsyncTimer, SetIntervalAsyncError }
