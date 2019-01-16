import { assert } from 'chai'
import {
  dynamic,
  fixed,
  legacy,
  clearIntervalAsync
} from '..'
import {
  setIntervalAsync as setIntervalAsyncD2,
  clearIntervalAsync as clearIntervalAsyncD
} from '../dynamic'
import {
  setIntervalAsync as setIntervalAsyncF2,
  clearIntervalAsync as clearIntervalAsyncF
} from '../fixed'
import {
  setIntervalAsync as setIntervalAsyncL2,
  clearIntervalAsync as clearIntervalAsyncL
} from '../legacy'
import { getFunctionBody } from './util/get-function-body'

let { setIntervalAsync: setIntervalAsyncD1 } = dynamic
let { setIntervalAsync: setIntervalAsyncF1 } = fixed
let { setIntervalAsync: setIntervalAsyncL1 } = legacy

describe('Exports', async () => {

  it('should have the correct type', async () => {
    assert.typeOf(setIntervalAsyncD1, 'function')
    assert.typeOf(setIntervalAsyncD2, 'function')
    assert.typeOf(clearIntervalAsyncD, 'function')
    assert.typeOf(setIntervalAsyncF1, 'function')
    assert.typeOf(setIntervalAsyncF2, 'function')
    assert.typeOf(clearIntervalAsyncF, 'function')
    assert.typeOf(setIntervalAsyncL1, 'function')
    assert.typeOf(setIntervalAsyncL2, 'function')
    assert.typeOf(clearIntervalAsyncL, 'function')
    assert.typeOf(clearIntervalAsync, 'function')
  })

  it('should match across packages', async () => {
    assert.equal(
      getFunctionBody(setIntervalAsyncD1),
      getFunctionBody(setIntervalAsyncD2)
    )
    assert.equal(
      getFunctionBody(setIntervalAsyncF1),
      getFunctionBody(setIntervalAsyncF2)
    )
    assert.equal(
      getFunctionBody(setIntervalAsyncL1),
      getFunctionBody(setIntervalAsyncL2)
    )
    assert.equal(
      getFunctionBody(clearIntervalAsync),
      getFunctionBody(clearIntervalAsyncD)
    )
    assert.equal(
      getFunctionBody(clearIntervalAsync),
      getFunctionBody(clearIntervalAsyncF)
    )
    assert.equal(
      getFunctionBody(clearIntervalAsync),
      getFunctionBody(clearIntervalAsyncL)
    )
  })

})
