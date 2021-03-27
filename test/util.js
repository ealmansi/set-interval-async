/**
 * Copyright (c) 2021 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

import { assert } from 'chai'
import {
  getNextIterationId,
} from '../src/util'

describe('getNextIterationId', () => {

  it('should return the next integer if safe', () => {
    assert.equal(getNextIterationId(0), 1)
    assert.equal(getNextIterationId(12345678), 12345679)
  })

  it('should return 0 if not safe', () => {
    assert.equal(getNextIterationId(Number.MAX_SAFE_INTEGER), 0)
  })

})
