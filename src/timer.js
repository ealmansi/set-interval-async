
/**
 * Return type for setIntervalAsync.
 */
export default class SetIntervalAsyncTimer {
  constructor () {
    this.stopped = false
    this.id = 0
    this.timeouts = {}
    this.promises = {}
  }
}
