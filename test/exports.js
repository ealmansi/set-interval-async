let { assert } = require('chai')
let {
  dynamic: { setIntervalAsync: setIntervalAsyncD1 },
  fixed: { setIntervalAsync: setIntervalAsyncF1 },
  legacy: { setIntervalAsync: setIntervalAsyncL1 },
  clearIntervalAsync
} = require('..')
let {
  setIntervalAsync: setIntervalAsyncD2,
  clearIntervalAsync: clearIntervalAsyncD
} = require('../dynamic')
let {
  setIntervalAsync: setIntervalAsyncF2,
  clearIntervalAsync: clearIntervalAsyncF
} = require('../fixed')
let {
  setIntervalAsync: setIntervalAsyncL2,
  clearIntervalAsync: clearIntervalAsyncL
} = require('../legacy')

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

function getFunctionBody (fn) {
  let fnString = fn.toString()
  return fnString
    .slice(
      fnString.indexOf('{') + 1,
      fnString.lastIndexOf('}')
    )
    .replace(/\bcov_[a-z0-9]+\b/g, '')
    .replace(/\[[0-9]+\]/g, '')
}
