/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

import lolex from 'lolex'
import { executeRuntimeTest } from './util/runtime-test'
import {
  setIntervalAsync,
  clearIntervalAsync
} from '../dynamic'

describe('Dynamic setIntervalAsync', async () => {

  let originalSetImmediate = setImmediate
  let clock = null

  beforeEach(async () => {
    clock = lolex.install()
  })

  afterEach(async () => {
    if (clock !== null) {
      clock.uninstall()
    }
  })

  it('should start and stop successfully with a synchronous handler', async () => {
    let timer = setIntervalAsync(
      () => {},
      1000
    )
    await clearIntervalAsync(timer)
  })

  it('should start and stop successfully with an asynchronous handler', async () => {
    let timer = setIntervalAsync(
      async () => {},
      1000
    )
    await clearIntervalAsync(timer)
  })

  it([
    'should behave like legacy setInterval when execution time < interval',
      '(real interval = given interval)',
      '[1]'
    ].join(' '), async () => {
    await executeRuntimeTest(
      1000,
      () => 100,
      [
        { time: 990, startCount: 0, endCount: 0 },
        { time: 1010, startCount: 1, endCount: 0 },
        { time: 1110, startCount: 1, endCount: 1 },
        { time: 1990, startCount: 1, endCount: 1 },
        { time: 2010, startCount: 2, endCount: 1 },
        { time: 2110, startCount: 2, endCount: 2 },
        { time: 2990, startCount: 2, endCount: 2 },
        { time: 3010, startCount: 3, endCount: 2 },
        { time: 3110, startCount: 3, endCount: 3 }
      ],
      setIntervalAsync,
      clearIntervalAsync,
      clock,
      originalSetImmediate
    )
  })

  it([
    'should behave like legacy setInterval when execution time < interval',
      '(real interval = given interval)',
      '[2]'
    ].join(' '), async () => {
    await executeRuntimeTest(
      700,
      () => 500,
      [
        { time: 706, startCount: 1, endCount: 0 },
        { time: 1216, startCount: 1, endCount: 1 },
        { time: 1406, startCount: 2, endCount: 1 },
        { time: 1907, startCount: 2, endCount: 2 },
        { time: 2107, startCount: 3, endCount: 2 },
        { time: 2608, startCount: 3, endCount: 3 },
        { time: 2808, startCount: 4, endCount: 3 },
        { time: 3309, startCount: 4, endCount: 4 },
        { time: 3509, startCount: 5, endCount: 4 },
        { time: 4010, startCount: 5, endCount: 5 },
        { time: 4209, startCount: 6, endCount: 5 },
        { time: 4710, startCount: 6, endCount: 6 }
      ],
      setIntervalAsync,
      clearIntervalAsync,
      clock,
      originalSetImmediate
    )
  })

  it([
    'should prevent reentrancy when execution time > interval',
    '(real interval = execution time)',
    '[1]'
  ].join(' '), async () => {
    await executeRuntimeTest(
      100,
      () => 1000,
      [
        { time: 90, startCount: 0, endCount: 0 },
        { time: 110, startCount: 1, endCount: 0 },
        { time: 1090, startCount: 1, endCount: 0 },
        { time: 1110, startCount: 2, endCount: 1 },
        { time: 2090, startCount: 2, endCount: 1 },
        { time: 2120, startCount: 3, endCount: 2 }
      ],
      setIntervalAsync,
      clearIntervalAsync,
      clock,
      originalSetImmediate
    )
  })

  it([
    'should prevent reentrancy when execution time > interval',
    '(real interval = execution time)',
    '[2]'
  ].join(' '), async () => {
    await executeRuntimeTest(
      500,
      () => 700,
      [
        { time: 506, startCount: 1, endCount: 0 },
        { time: 1220, startCount: 2, endCount: 1 },
        { time: 1922, startCount: 3, endCount: 2 },
        { time: 2624, startCount: 4, endCount: 3 },
        { time: 3327, startCount: 5, endCount: 4 },
        { time: 4030, startCount: 6, endCount: 5 },
        { time: 4733, startCount: 7, endCount: 6 }
      ],
      setIntervalAsync,
      clearIntervalAsync,
      clock,
      originalSetImmediate
    )
  })

})
