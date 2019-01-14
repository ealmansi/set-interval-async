
/**
 * Return type for setIntervalAsync.
 */
export default class SetIntervalAsyncTimer {
  constructor () {
    this.timeoutId = null
    this.promise = null
    this.stopped = false
  }
}
