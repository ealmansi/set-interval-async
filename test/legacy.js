import lolex from 'lolex'
import { executeRuntimeTest } from './util/runtime-test'
import {
  setIntervalAsync,
  clearIntervalAsync
} from '../legacy'

describe('Legacy setIntervalAsync', async () => {

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
      700,
      () => 500,
      [
        { time: 705, startCount: 1, endCount: 0 },
        { time: 1216, startCount: 1, endCount: 1 },
        { time: 1404, startCount: 2, endCount: 1 },
        { time: 1905, startCount: 2, endCount: 2 },
        { time: 2104, startCount: 3, endCount: 2 },
        { time: 2605, startCount: 3, endCount: 3 },
        { time: 2805, startCount: 4, endCount: 3 },
        { time: 3306, startCount: 4, endCount: 4 },
        { time: 3506, startCount: 5, endCount: 4 },
        { time: 4007, startCount: 5, endCount: 5 },
        { time: 4207, startCount: 6, endCount: 5 },
        { time: 4708, startCount: 6, endCount: 6 },
        { time: 4907, startCount: 7, endCount: 6 },
        { time: 5408, startCount: 7, endCount: 7 }
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
      1000,
      () => 100,
      [
        { time: 1005, startCount: 1, endCount: 0 },
        { time: 1116, startCount: 1, endCount: 1 },
        { time: 2005, startCount: 2, endCount: 1 },
        { time: 2105, startCount: 2, endCount: 2 },
        { time: 3006, startCount: 3, endCount: 2 },
        { time: 3107, startCount: 3, endCount: 3 },
        { time: 4007, startCount: 4, endCount: 3 },
        { time: 4108, startCount: 4, endCount: 4 },
        { time: 5008, startCount: 5, endCount: 4 },
        { time: 5109, startCount: 5, endCount: 5 },
        { time: 6009, startCount: 6, endCount: 5 },
        { time: 6110, startCount: 6, endCount: 6 }
      ],
      setIntervalAsync,
      clearIntervalAsync,
      clock,
      originalSetImmediate
    )
  })

  it([
    'should allow reentrancy when execution time > interval',
    '(real interval = given interval)',
    '[1]'
  ].join(' '), async () => {
    await executeRuntimeTest(
      100,
      () => 1000,
      [
        { time: 104, startCount: 1, endCount: 0 },
        { time: 204, startCount: 2, endCount: 0 },
        { time: 305, startCount: 3, endCount: 0 },
        { time: 404, startCount: 4, endCount: 0 },
        { time: 505, startCount: 5, endCount: 0 },
        { time: 606, startCount: 6, endCount: 0 },
        { time: 706, startCount: 7, endCount: 0 },
        { time: 806, startCount: 8, endCount: 0 },
        { time: 907, startCount: 9, endCount: 0 },
        { time: 1008, startCount: 10, endCount: 0 },
        { time: 1109, startCount: 11, endCount: 1 },
        { time: 1113, startCount: 11, endCount: 1 },
        { time: 1207, startCount: 12, endCount: 2 },
        { time: 1209, startCount: 12, endCount: 2 },
        { time: 1306, startCount: 13, endCount: 3 },
        { time: 1310, startCount: 13, endCount: 3 }
      ],
      setIntervalAsync,
      clearIntervalAsync,
      clock,
      originalSetImmediate
    )
  })

  it([
    'should allow reentrancy when execution time > interval',
    '(real interval = given interval)',
    '[1]'
  ].join(' '), async () => {
    await executeRuntimeTest(
      500,
      () => 700,
      [
        { time: 506, startCount: 1, endCount: 0 },
        { time: 1007, startCount: 2, endCount: 0 },
        { time: 1215, startCount: 2, endCount: 1 },
        { time: 1509, startCount: 3, endCount: 1 },
        { time: 1709, startCount: 3, endCount: 2 },
        { time: 2009, startCount: 4, endCount: 2 },
        { time: 2210, startCount: 4, endCount: 3 },
        { time: 2510, startCount: 5, endCount: 3 },
        { time: 2710, startCount: 5, endCount: 4 },
        { time: 3011, startCount: 6, endCount: 4 },
        { time: 3211, startCount: 6, endCount: 5 },
        { time: 3512, startCount: 7, endCount: 5 },
        { time: 3711, startCount: 7, endCount: 6 },
        { time: 4012, startCount: 8, endCount: 6 },
        { time: 4213, startCount: 8, endCount: 7 }
      ],
      setIntervalAsync,
      clearIntervalAsync,
      clock,
      originalSetImmediate
    )
  })

})
