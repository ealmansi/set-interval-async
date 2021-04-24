/**
 * Copyright (c) 2019-2021 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

import SetIntervalAsyncError from './error'

const MIN_INTERVAL_MS = 10

/**
 * @private
 *
 * @param {function} handler - Handler function to be executed in intervals.<br>
 *                             May be asynchronous.
 */
export function validateHandler (handler) {
  if (!(
    typeof handler === 'function'
  )) {
    throw new SetIntervalAsyncError(
      'Invalid argument: "handler". Expected a function.'
    )
  }
}

/**
 * @private
 *
 * @param {number} interval - Interval in milliseconds. Must be at least 10 ms.
 */
export function validateInterval (interval) {
  if (!(
    typeof interval === 'number' && MIN_INTERVAL_MS <= interval
  )) {
    throw new SetIntervalAsyncError(
      `Invalid argument: "interval". Expected a number greater than or equal to ${MIN_INTERVAL_MS}.`
    )
  }
}

/**
 * @private
 *
 * @param {SetIntervalAsyncTimer} timer
 */
export function validateTimer (timer) {
  if (!(
    timer &&
    'stopped' in timer &&
    'timeouts' in timer &&
    'promises' in timer
  )) {
    throw new SetIntervalAsyncError(
      'Invalid argument: "timer". Expected an instance of SetIntervalAsyncTimer.'
    )
  }
}
