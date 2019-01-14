
import { clearIntervalAsync } from './clear'
import { validateHandler, validateInterval } from './util'
import SetIntervalAsyncError from './error'
import Timer from './timer'

/**
 * 
 * @param {function} handler - Handler function to be executed in intervals.
 * @param {number} interval - Interval in milliseconds.
 * @returns a Timer object which can be used to stop execution.
 */
function setIntervalAsync (handler, interval) {
  validateHandler(handler)
  validateInterval(interval)
  let timer = new Timer()
  timer.timeoutId = setTimeout(
    async function fn () {
      let start = new Date()
      let promise = Promise.resolve(handler())
      timer.promise = promise
      await promise
      if (!timer.stopped) {
        let executionTime = new Date() - start
        let timeout = interval > executionTime ? interval - executionTime : 0
        timer.timeoutId = setTimeout(fn, timeout)
      }
    },
    interval
  )
  return timer
}

export { setIntervalAsync, clearIntervalAsync, SetIntervalAsyncError }
