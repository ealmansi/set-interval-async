/**
 * Copyright (c) 2019-2021 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

/**
 * Stops an execution cycle started by setIntervalAsync.<br>
 * Any ongoing function executions will run until completion,
 * but all future ones will be cancelled.
 *
 * @param {SetIntervalAsyncTimer} timer
 * @returns {Promise}
 *          A promise which resolves when all pending executions have finished.
 */
export async function clearIntervalAsync (timer) {
  timer.stopped = true
  for (const iterationId in timer.timeouts) {
    clearTimeout(timer.timeouts[iterationId])
    delete timer.timeouts[iterationId]
  }
  for (const iterationId in timer.promises) {
    try {
      await timer.promises[iterationId]
    } catch (_) {
      // Do nothing.
    }
    delete timer.promises[iterationId]
  }
}
