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
 * Executes the given handler at fixed intervals, while preventing<br>
 * multiple concurrent executions. The handler will never be executed<br>
 * concurrently more than once in any given moment, providing a fixed<br>
 * time interval between the <strong>end</strong> of a given execution and the <strong>start</strong> of<br>
 * the following one.
 *
 * @param {function} handler - Handler function to be executed in intervals.<br>
 *                             May be asynchronous.
 * @param {number} interval - Interval in milliseconds. Must be at least 10 ms.
 * @param {...*} args - Any number of arguments to pass on to the handler.
 * @returns {SetIntervalAsyncTimer}
 *          A timer object which can be used to stop execution with {@link clearIntervalAsync}.
 *
 * @alias [Fixed] setIntervalAsync
 */
function setIntervalAsync (handler, interval, ...args) {
  validateHandler(handler)
  validateInterval(interval)
  const timer = new SetIntervalAsyncTimer()
  const iterationId = 0;
  timer.timeouts[iterationId] = setTimeout(
    timeoutHandler,
    interval,
    timer,
    iterationId,
    handler,
    interval,
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
  try {
    await handler(...args);
  } finally {
    if (!timer.stopped) {
      const nextIterationId = getNextIterationId(iterationId);
      timer.timeouts[nextIterationId] = setTimeout(
        timeoutHandler,
        interval,
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

export { setIntervalAsync, clearIntervalAsync, SetIntervalAsyncError }
