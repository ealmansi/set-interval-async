/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

/**
 * Error thrown by setIntervalAsync when invalid arguments are provided.
 */
class SetIntervalAsyncError extends Error {
}

Object.defineProperty(
  SetIntervalAsyncError.prototype,
  'name',
  {
    value: 'SetIntervalAsyncError'
  }
)

export default SetIntervalAsyncError
