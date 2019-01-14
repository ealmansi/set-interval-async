let { assert } = require('chai')
let lolex = require('lolex')
let {
  setIntervalAsync,
  clearIntervalAsync
} = require('set-interval-async/legacy')
let { executeRuntimeTest } = require('./util')

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

  it([
    'should behave like legacy setInterval when execution time < interval',
      '(real interval = given interval)'
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
    'should allow reentrancy when execution time > interval',
    '(real interval = given interval)'
  ].join(' '), async () => {
    await executeRuntimeTest(
      100,
      () => 1000,
      [
        { time: 90, startCount: 0, endCount: 0 },
        { time: 110, startCount: 1, endCount: 0 },
        { time: 190, startCount: 1, endCount: 0 },
        { time: 210, startCount: 2, endCount: 0 },
        { time: 290, startCount: 2, endCount: 0 },
        { time: 310, startCount: 3, endCount: 0 },
        { time: 1090, startCount: 10, endCount: 0 },
        { time: 1110, startCount: 11, endCount: 1 }
      ],
      setIntervalAsync,
      clearIntervalAsync,
      clock,
      originalSetImmediate
    )
  })
})
