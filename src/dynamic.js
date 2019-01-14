
import { clearIntervalAsync } from './clear'
import { validateHandler, validateInterval } from './util'
import SetIntervalAsyncError from './error'
import SetIntervalAsyncTimer from './timer'

/**
 * 
 * @param {function} handler - Handler function to be executed in intervals.
 * @param {number} interval - Interval in milliseconds.
 * @returns a SetIntervalAsyncTimer object which can be used to stop execution.
 */
function setIntervalAsync (handler, interval) {
  validateHandler(handler)
  validateInterval(interval)
  let timer = new SetIntervalAsyncTimer()
  timer.timeoutId = setTimeout(
    function fn () {
      let startTime, endTime
      timer.promise = Promise.resolve(
      ).then(
        () => {
          startTime = new Date()
          return handler()
        }
      ).then(
        () => {
          endTime = new Date()
          if (!timer.stopped) {
            let executionTime = endTime - startTime
            let timeout = interval > executionTime ? interval - executionTime : 0
            timer.timeoutId = setTimeout(fn, timeout)
          }
        }
      )
    },
    interval
  )
  return timer
}

export { setIntervalAsync, clearIntervalAsync, SetIntervalAsyncError }
