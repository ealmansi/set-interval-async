import { assert } from 'chai'

export function runFixture (
  fixture,
  setIntervalAsync,
  clearIntervalAsync,
  clock
) {
  let {
    i: interval,
    x: executionTimes,
    d: duration,
    c: expectedCalls
  } = fixture
  let callCount = 0
  let actualCalls = []
  let timer = setIntervalAsync(
    async () => {
      let startTime = new Date().getTime()
      callCount = callCount + 1
      let executionTime = executionTimes[(callCount - 1) % executionTimes.length]
      await sleep(executionTime)
      let endTime = new Date().getTime()
      actualCalls.push({ s: startTime, e: endTime })
    },
    interval
  )
  setTimeout(
    async () => {
      await clearIntervalAsync(timer)
    },
    duration
  )
  clock.runAll()
  try {
    assert.deepEqual(actualCalls, expectedCalls)
  } catch (err) {
    console.log(JSON.stringify(actualCalls, null, 2))
    throw err
  }
}

async function sleep (ms) {
  await new Promise(
    (resolve) => {
      setTimeout(resolve, ms)
    }
  )
}
