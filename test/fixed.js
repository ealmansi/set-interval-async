import lolex from 'lolex'
import { executeRuntimeTest } from './util/runtime-test'
import {
  setIntervalAsync,
  clearIntervalAsync
} from '../fixed'

describe('Fixed setIntervalAsync', async () => {

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

  it('should guarantee a fixed interval between executions when execution time < interval [1]', async () => {
    await executeRuntimeTest(
      1000,
      () => 100,
      [
        { time: 990, startCount: 0, endCount: 0 },
        { time: 1010, startCount: 1, endCount: 0 },
        { time: 1090, startCount: 1, endCount: 0 },
        { time: 1110, startCount: 1, endCount: 1 },
        { time: 2090, startCount: 1, endCount: 1 },
        { time: 2110, startCount: 2, endCount: 1 },
        { time: 2190, startCount: 2, endCount: 1 },
        { time: 2210, startCount: 2, endCount: 2 }
      ],
      setIntervalAsync,
      clearIntervalAsync,
      clock,
      originalSetImmediate
    )
  })

  it('should guarantee a fixed interval between executions when execution time < interval [2]', async () => {
    await executeRuntimeTest(
      700,
      () => 500,
      [
        { time: 706, startCount: 1, endCount: 0 },
        { time: 1216, startCount: 1, endCount: 1 },
        { time: 1919, startCount: 2, endCount: 1 },
        { time: 2420, startCount: 2, endCount: 2 },
        { time: 3121, startCount: 3, endCount: 2 },
        { time: 3622, startCount: 3, endCount: 3 },
        { time: 4323, startCount: 4, endCount: 3 },
        { time: 4824, startCount: 4, endCount: 4 },
        { time: 5526, startCount: 5, endCount: 4 },
        { time: 6027, startCount: 5, endCount: 5 },
        { time: 6728, startCount: 6, endCount: 5 },
        { time: 7229, startCount: 6, endCount: 6 }
      ],
      setIntervalAsync,
      clearIntervalAsync,
      clock,
      originalSetImmediate
    )
  })

  it('should guarantee a fixed interval between executions when execution time > interval [1]', async () => {
    await executeRuntimeTest(
      100,
      () => 1000,
      [
        { time: 90, startCount: 0, endCount: 0 },
        { time: 110, startCount: 1, endCount: 0 },
        { time: 1090, startCount: 1, endCount: 0 },
        { time: 1110, startCount: 1, endCount: 1 },
        { time: 1190, startCount: 1, endCount: 1 },
        { time: 1210, startCount: 2, endCount: 1 },
        { time: 2190, startCount: 2, endCount: 1 },
        { time: 2210, startCount: 2, endCount: 2 }
      ],
      setIntervalAsync,
      clearIntervalAsync,
      clock,
      originalSetImmediate
    )
  })

  it('should guarantee a fixed interval between executions when execution time > interval [2]', async () => {
    await executeRuntimeTest(
      500,
      () => 700,
      [
        { time: 506, startCount: 1, endCount: 0 },
        { time: 1215, startCount: 1, endCount: 1 },
        { time: 1717, startCount: 2, endCount: 1 },
        { time: 2419, startCount: 2, endCount: 2 },
        { time: 2920, startCount: 3, endCount: 2 },
        { time: 3621, startCount: 3, endCount: 3 },
        { time: 4122, startCount: 4, endCount: 3 },
        { time: 4823, startCount: 4, endCount: 4 },
        { time: 5324, startCount: 5, endCount: 4 },
        { time: 6025, startCount: 5, endCount: 5 },
        { time: 6526, startCount: 6, endCount: 5 },
        { time: 7227, startCount: 6, endCount: 6 }
      ],
      setIntervalAsync,
      clearIntervalAsync,
      clock,
      originalSetImmediate
    )
  })

})
