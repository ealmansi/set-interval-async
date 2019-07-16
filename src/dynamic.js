/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

import { clearIntervalAsync } from './clear'
import { validateHandler, validateInterval } from './validation'
import SetIntervalAsyncError from './error'
import SetIntervalAsyncTimer from './timer'

/**
 * Attempts to execute the given handler at regular intervals, while preventing<br>
 * multiple concurrent executions. The handler will never be executed concurrently<br>
 * more than once in any given moment. If the running time of any execution exceeds<br>
 * the desired interval, the following execution will be scheduled as soon as<br>
 * possible; ie. immediately after the previous execution concludes.
 *
 * @param {function} handler - Handler function to be executed in intervals.<br>
 *                             May be asynchronous.
 * @param {number} interval - Interval in milliseconds. Must be at least 10 ms.
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
  const id = timer.id
  timer.timeouts[id] = setTimeout(
    timeoutHandler,
    interval,
    timer,
    handler,
    interval,
    ...args
  )
  return timer
}

function timeoutHandler (timer, handler, interval, ...args) {
  const id = timer.id
  timer.promises[id] = (async () => {
    const startTime = new Date()
    try {
      await handler(...args)
    } catch (err) {
      console.error(err)
    }
    const endTime = new Date()
    if (!timer.stopped) {
      const executionTime = endTime - startTime
      const timeout = interval > executionTime
        ? interval - executionTime
        : 0
      timer.timeouts[id + 1] = setTimeout(
        timeoutHandler,
        timeout,
        timer,
        handler,
        interval,
        ...args
      )
    }
    delete timer.timeouts[id]
    delete timer.promises[id]
  })()
  timer.id = id + 1
}

export { setIntervalAsync, clearIntervalAsync, SetIntervalAsyncError }
