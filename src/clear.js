
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
  timer.stopped = true
  for (let timeout of Object.values(timer.timeouts)) {
    clearTimeout(timeout)
  }
  let intervalId = setInterval(() => {}, Math.pow(2, 31) - 1)
  await Promise.all(
    Object.values(timer.promises)
  ).then(
    () => clearInterval(intervalId)
  )
}

export { clearIntervalAsync }
