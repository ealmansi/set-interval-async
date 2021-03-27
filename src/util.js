/**
 * Copyright (c) 2021 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

/**
 * @private
 *
 * @param {SetIntervalAsyncTimer} timer
 */
export function getNextIterationId (iterationId) {
  if (iterationId === Number.MAX_SAFE_INTEGER) {
    return 0;
  }
  return iterationId + 1
}

/**
 * @private
 */
export async function noop () {
}
