
/**
 * Stops an execution cycle started by setIntervalAsync.
 *
 * Any ongoing function executions will run until completion,
 * but all future ones will be cancelled.
 *
 * @param {SetIntervalAsyncTimer} timer
 * @returns a Promise indicating when the last execution has finished
 */
async function clearIntervalAsync (timer) {
  if (timer.timeoutId !== null) {
    clearTimeout(timer.timeoutId)
    timer.timeoutId = null
  }
  timer.stopped = true
  await Promise.resolve(timer.promise)
}

export { clearIntervalAsync }
