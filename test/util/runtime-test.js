/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

import { assert } from 'chai'

export async function executeRuntimeTest (
  interval,
  getExecutionTime,
  expectedCounts,
  setIntervalAsync,
  clearIntervalAsync,
  clock
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
    currentTime = clock.tick(nextTime - currentTime)
    assert.equal(startCount, expectedStartCount)
    assert.equal(endCount, expectedEndCount)
  }
  let clearIntervalAsyncPromise = clearIntervalAsync(timer)
  clock.runAll()
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
