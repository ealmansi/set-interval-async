/**
 * Copyright (c) 2021 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

import { assert } from 'chai'
import {
  dynamic,
  fixed,
  legacy,
  clearIntervalAsync,
} from '..'

let { setIntervalAsync: setIntervalAsyncD } = dynamic
let { setIntervalAsync: setIntervalAsyncF } = fixed
let { setIntervalAsync: setIntervalAsyncL } = legacy

describe('Validation', async () => {

  it('should reject invalid arguments to setIntervalAsync', async () => {
    let invalidHandlers = [undefined, null, {}, [], 'x', 42]
    let invalidIntervals = [undefined, null, {}, [], 'x', () => {}]
    for (let invalidHandler of invalidHandlers) {
      assert.throws(
        () => {
          setIntervalAsyncD(invalidHandler)
        }
      )
      assert.throws(
        () => {
          setIntervalAsyncF(invalidHandler)
        }
      )
      assert.throws(
        () => {
          setIntervalAsyncL(invalidHandler)
        }
      )
    }
    for (let invalidInterval of invalidIntervals) {
      assert.throws(
        () => {
          setIntervalAsyncD(
            () => {},
            invalidInterval
          )
        }
      )
      assert.throws(
        () => {
          setIntervalAsyncF(
            () => {},
            invalidInterval
          )
        }
      )
      assert.throws(
        () => {
          setIntervalAsyncL(
            () => {},
            invalidInterval
          )
        }
      )
    }
  })

  it('should reject invalid arguments to clearIntervalAsync', async () => {
    let invalidTimers = [undefined, null, {}, [], 'x', 42]
    for (let invalidTimer of invalidTimers) {
      let threw
      try {
        await clearIntervalAsync(invalidTimer)
        threw = false
      } catch (_) {
        threw = true
        // Do nothing.
      }
      assert.isTrue(threw)
    }
  })

})
