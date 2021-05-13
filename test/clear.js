/**
 * Copyright (c) 2021 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

import { assert } from 'chai'
import {
  clearIntervalAsync as clearIntervalAsyncD,
  setIntervalAsync as setIntervalAsyncD,
  SetIntervalAsyncTimer as SetIntervalAsyncTimerD
} from '../dynamic'
import {
  clearIntervalAsync as clearIntervalAsyncF,
  setIntervalAsync as setIntervalAsyncF,
  SetIntervalAsyncTimer as SetIntervalAsyncTimerF
} from '../fixed'
import {
  clearIntervalAsync as clearIntervalAsyncL,
  setIntervalAsync as setIntervalAsyncL,
  SetIntervalAsyncTimer as SetIntervalAsyncTimerL
} from '../legacy'
import { sleep } from './util/sleep'

describe('clearIntervalAsync', () => {
  for (const [type, [setIntervalAsync, clearIntervalAsync, SetIntervalAsyncTimer]] of [
    ['dynamic', [setIntervalAsyncD, clearIntervalAsyncD, SetIntervalAsyncTimerD]],
    ['fixed', [setIntervalAsyncF, clearIntervalAsyncF, SetIntervalAsyncTimerF]],
    ['legacy', [setIntervalAsyncL, clearIntervalAsyncL, SetIntervalAsyncTimerL]]
  ]) {
    it(`should clear an uninitialized timer without errors [${type}]`, async () => {
      await clearIntervalAsync(new SetIntervalAsyncTimer())
    })

    it(`should wait until the interval is fully stopped [${type}]`, async () => {
      let running = false
      const timer = setIntervalAsync(async () => {
        running = true
        await sleep(300)
        running = false
      }, 10)
      await sleep(100)
      assert.isTrue(running)
      await clearIntervalAsync(timer)
      await sleep(500)
      assert.isFalse(running)
    })

    it(`should leave no stale objects after clearing an interval [${type}]`, async () => {
      const timer = setIntervalAsync(async () => {
      }, 10)
      await sleep(100)
      await clearIntervalAsync(timer)
      assert.deepEqual(timer.timeouts, {})
      assert.deepEqual(timer.promises, {})
    })

    it(`should call the clear() method on the timer [${type}]`, async () => {
      let running = false
      const timer = setIntervalAsync(async () => {
        running = true
        await sleep(300)
        running = false
      }, 10)
      await sleep(100)
      assert.isTrue(running)
      await timer.clear()
      await sleep(500)
      assert.isFalse(running)
    })
  }
})
