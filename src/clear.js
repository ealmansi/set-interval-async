
/**
 * Stops an execution cycle started by setIntervalAsync.
 *
 * Any ongoing function executions will run until completion,
 * but all future ones will be cancelled.
 *
 * @param {Timer} timer
 * @returns a Promise indicating when the last execution has finished
 */
async function clearIntervalAsync (timer) {
  if (timer.timeoutId !== null) {
    clearTimeout(timer.timeoutId)
    timer.timeoutId = null
  }
  let promise = timer.promise !== null
    ? timer.promise.then(() => {})
    : Promise.resolve()
  timer.promise = null
  timer.stopped = true
  return promise
}

export { clearIntervalAsync }
