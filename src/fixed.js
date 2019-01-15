
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
  let id = timer.id
  timer.timeouts[id] = setTimeout(
    function timeoutHandler () {
      let id = timer.id
      timer.promises[id] = Promise.resolve(
      ).then(
        handler
      ).then(
        () => {
          delete timer.timeouts[id]
          delete timer.promises[id]
          if (!timer.stopped) {
            timer.timeouts[id + 1] = setTimeout(timeoutHandler, interval)
          }
        }
      )
      timer.id = id + 1
    },
    interval
  )
  return timer
}

export { setIntervalAsync, clearIntervalAsync, SetIntervalAsyncError }
