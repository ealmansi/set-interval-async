
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
      timer.promise = Promise.resolve(
      ).then(
        handler
      ).then(
        () => {
          if (!timer.stopped) {
            timer.timeoutId = setTimeout(fn, interval)
          }
        }
      )
    },
    interval
  )
  return timer
}

export { setIntervalAsync, clearIntervalAsync, SetIntervalAsyncError }
