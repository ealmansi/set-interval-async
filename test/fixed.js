let { assert } = require('chai')
let lolex = require('lolex')
let {
  setIntervalAsync,
  clearIntervalAsync
} = require('../fixed')
let { executeRuntimeTest } = require('./util')

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

  it('should validate arguments', async () => {
    let invalidHandlers = [undefined, null, {}, [], 'x', 42]
    let invalidIntervals = [undefined, null, {}, [], 'x', () => {}]
    for (let invalidHandler of invalidHandlers) {
      assert.throws(
        () => {
          setIntervalAsync(invalidHandler)
        }
      )
    }
    for (let invalidInterval of invalidIntervals) {
      assert.throws(
        () => {
          setIntervalAsync(
            () => {},
            invalidInterval
          )
        }
      )
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

  it('should guarantee a fixed interval between executions when execution time < interval', async () => {
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

  it('should guarantee a fixed interval between executions when execution time > interval', async () => {
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
})
