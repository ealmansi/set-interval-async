/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */
import { clearIntervalAsync } from './clear'
/**
 * Timer object returned by setIntervalAsync.<br>
 * Can be used together with {@link clearIntervalAsync} to stop execution.
 */
class SetIntervalAsyncTimer {
  constructor () {
    this.stopped = false
    this.timeouts = {}
    this.promises = {}
  }

  clear () {
    return clearIntervalAsync(this)
  }
}

export default SetIntervalAsyncTimer
