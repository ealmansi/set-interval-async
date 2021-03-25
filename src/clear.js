/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

const NOOP_INTERVAL_MS = 60 * 1000

/**
 * Stops an execution cycle started by setIntervalAsync.<br>
 * Any ongoing function executions will run until completion,
 * but all future ones will be cancelled.
 *
 * @param {SetIntervalAsyncTimer} timer
 * @returns {Promise}
 *          A promise which resolves when all pending executions have finished.
 */
async function clearIntervalAsync (timer) {
  timer.stopped = true
  for (const timeout of Object.values(timer.timeouts)) {
    clearTimeout(timeout)
  }
  const noop = () => {}
  const promises = Object
    .values(timer.promises)
    .map(
      (promise) => {
        promise.catch(noop)
      }
    )
  const noopInterval = setInterval(noop, NOOP_INTERVAL_MS)
  await Promise.all(promises)
  clearInterval(noopInterval)
}

export { clearIntervalAsync }
