
/**
 * Return type for setIntervalAsync.
 */
export default class Timer {
  constructor () {
    this.timeoutId = null
    this.promise = null
    this.stopped = false
  }
}
