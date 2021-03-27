/**
 * Copyright (c) 2021 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

import { assert } from 'chai'
import {
  clearIntervalAsync as clearIntervalAsyncD,
  setIntervalAsync as setIntervalAsyncD
} from '../dynamic'
import {
  clearIntervalAsync as clearIntervalAsyncF,
  setIntervalAsync as setIntervalAsyncF
} from '../fixed'
import {
  clearIntervalAsync as clearIntervalAsyncL,
  setIntervalAsync as setIntervalAsyncL
} from '../legacy'
import { sleep } from './util/sleep'

describe('clearIntervalAsync', () => {

  for (const [type, [setIntervalAsync, clearIntervalAsync]] of [
    ['dynamic', [setIntervalAsyncD, clearIntervalAsyncD]],
    ['fixed', [setIntervalAsyncF, clearIntervalAsyncF]],
    ['legacy', [setIntervalAsyncL, clearIntervalAsyncL]],
  ]) {
    it(`should wait until the interval is fully stopped [${type}]`, async () => {
      let running = false
      const timer = setIntervalAsync(async () => {
        running = true
        await sleep(100)
        running = false
      }, 10)
      await sleep(50)
      assert.isTrue(running)
      await clearIntervalAsync(timer)
      assert.isFalse(running)
    })

    it(`should leave no stale objects after clearing an interval [${type}]`, async () => {
      const timer = setIntervalAsync(async () => {
      }, 10)
      await sleep(100)
      await clearIntervalAsync(timer)
      assert.deepEqual(timer.timeouts, {});
      assert.deepEqual(timer.promises, {});
    })
  }

})
