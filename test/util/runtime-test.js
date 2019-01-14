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
      await sleep(getExecutionTime(startCount - 1))
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
  clock.runToFrame()
  let clearIntervalPromise = clearIntervalAsync(timer)
  clock.runAll()
  await clearIntervalPromise
}

async function sleep (
  milliseconds
) {
  await new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

async function tick (
  milliseconds,
  clock,
  originalSetImmediate
) {
  if (milliseconds < 10) {
    throw new Error('Minimum tick is 10 milliseconds.')
  }
  let currentTime = clock.tick(milliseconds - 10)
  for (let i = 0; i < 10; ++i) {
    await new Promise(resolve => originalSetImmediate(resolve))
    currentTime = clock.tick(1)
  }
  return currentTime
}

module.exports = {
  executeRuntimeTest
}
