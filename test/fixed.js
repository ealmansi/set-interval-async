/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

import {
  setIntervalAsync,
  clearIntervalAsync
} from '../fixed'
import { assert } from 'chai'
import { runFixture } from './util/run-fixture'
import BluebirdPromise from 'bluebird'
import fs from 'fs'
import lolex from 'lolex'
import path from 'path'

describe('Fixed setIntervalAsync', async () => {

  let OriginalPromise = Promise
  let clock = null

  beforeEach(async () => {
    clock = lolex.install()
    Promise = BluebirdPromise
    Promise.setScheduler((fn) => fn())
  })

  afterEach(async () => {
    clock.uninstall()
    clock = null
    Promise = OriginalPromise
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

  it('should continue running even if an error occurs during execution', async () => {
    let actualCount = 0
    let timer = setIntervalAsync(
      async () => {
        actualCount = actualCount + 1
        throw new Error('Some error.')
      },
      1000
    )
    clock.runToLast()
    clock.runToLast()
    await clearIntervalAsync(timer)
    assert.equal(actualCount, 2)
  })

  runFixturesFromResource(
    path.join('fixed', 'execution-time-lt-interval.json')
  )

  runFixturesFromResource(
    path.join('fixed', 'execution-time-gt-interval.json')
  )

  function runFixturesFromResource (resourceFilePath) {
    let {
      t: title,
      f: fixtures
    } = loadResource(resourceFilePath)
    for (let [index, fixture] of fixtures.entries()) {
      it(`${title} [${index + 1}]`, async () => {
        runFixture(fixture, setIntervalAsync, clearIntervalAsync, clock)
      })
    }
  }

  function loadResource (resourceFilePath) {
    return JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, 'resources', resourceFilePath)
      )
    )
  }

})
