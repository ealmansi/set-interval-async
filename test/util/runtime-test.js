let { assert } = require('chai')

async function executeRuntimeTest (
  interval,
  getExecutionTime,
  expectedCounts,
  setIntervalAsync,
  clearIntervalAsync,
  clock,
  originalSetImmediate
) {
  let startCount = 0
  let endCount = 0
  let timer = setIntervalAsync(
    async () => {
      startCount = startCount + 1
      let executionTime = getExecutionTime(startCount - 1)
      await sleep(executionTime)
      endCount = endCount + 1
    },
    interval
  )
  let currentTime = 0
  for (let expectedCount of expectedCounts) {
    let {
      time: nextTime,
      startCount: expectedStartCount,
      endCount: expectedEndCount
    } = expectedCount
    currentTime = await tick(
      nextTime - currentTime,
      clock,
      originalSetImmediate
    )
    assert.equal(startCount, expectedStartCount)
    assert.equal(endCount, expectedEndCount)
  }
  let clearIntervalAsyncPromise = clearIntervalAsync(timer)
  await tick(
    1e5,
    clock,
    originalSetImmediate
  )
  await clearIntervalAsyncPromise
  assert.equal(startCount, endCount)
}

async function sleep (
  milliseconds
) {
  await new Promise(
    (resolve) => {
      setTimeout(resolve, milliseconds)
    }
  )
}

async function tick (
  milliseconds,
  clock,
  originalSetImmediate
) {
  if (milliseconds < 1) {
    throw new Error('Minimum tick is 1 milliseconds.')
  }
  clock.tick(milliseconds - 1)
  await new Promise(resolve => originalSetImmediate(resolve))
  return clock.tick(1)
}

module.exports = {
  executeRuntimeTest
}
