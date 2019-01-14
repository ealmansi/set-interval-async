
import SetIntervalAsyncError from './error'

/**
 * 
 * @param {function} handler - Handler function to be executed in intervals.
 */
export function validateHandler (handler) {
  if (!(
    typeof handler === 'function'
  )) {
    throw new SetIntervalAsyncError(
      'Invalid argument: `handler`. Expected a function.'
    )
  }
}

/**
 *
 * @param {number} interval - Interval in milliseconds.
 */
export function validateInterval (interval) {
  if (!(
    typeof interval === 'number' && 10 <= interval
  )) {
    throw new SetIntervalAsyncError(
      'Invalid argument: `interval`. Expected a number greater or equal to 10.'
    )
  }
}
