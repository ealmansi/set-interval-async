/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

import { assert } from 'chai'

export function runFixture (
  fixture,
  setIntervalAsync,
  clearIntervalAsync,
  clock
) {
  const {
    i: interval,
    x: executionTimes,
    d: duration,
    c: expectedCalls
  } = fixture
  let callCount = 0
  const actualCalls = []
  const timer = setIntervalAsync(
    async () => {
      const startTime = new Date().getTime()
      callCount = callCount + 1
      const executionTime = executionTimes[(callCount - 1) % executionTimes.length]
      await sleep(executionTime)
      const endTime = new Date().getTime()
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
