/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
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
async function clearIntervalAsync (timer) {
  timer.stopped = true
  for (let timeout of Object.values(timer.timeouts)) {
    clearTimeout(timeout)
  }
  let promises = Object
    .values(timer.promises)
    .map(
      (promise) => promise.catch(() => {})
    )
  let intervalId = setInterval(() => {}, Math.pow(2, 31) - 1)
  await Promise.all(
    promises
  ).then(
    () => clearInterval(intervalId)
  )
}

export { clearIntervalAsync }
