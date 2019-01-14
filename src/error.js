
/**
 * Error thrown by setIntervalAsync.
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
