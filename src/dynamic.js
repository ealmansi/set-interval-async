
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
      let startTime = null, endTime = null
      timer.promises[id] = Promise.resolve(
      ).then(
        () => {
          startTime = new Date()
          return handler()
        }
      ).then(
        () => {
          endTime = new Date()
          delete timer.timeouts[id]
          delete timer.promises[id]
          if (!timer.stopped) {
            let executionTime = endTime - startTime
            let timeout = interval > executionTime ? interval - executionTime : 0
            timer.timeouts[id + 1] = setTimeout(timeoutHandler, timeout)
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
