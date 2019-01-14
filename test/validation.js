let { assert } = require('chai')
let {
  dynamic: { setIntervalAsync: setIntervalAsyncD },
  fixed: { setIntervalAsync: setIntervalAsyncF },
  legacy: { setIntervalAsync: setIntervalAsyncL }
} = require('..')

describe('Validation', async () => {

  it('should reject invalid arguments to setIntervalAsync', async () => {
    let invalidHandlers = [undefined, null, {}, [], 'x', 42]
    let invalidIntervals = [undefined, null, {}, [], 'x', () => {}]
    for (let invalidHandler of invalidHandlers) {
      assert.throws(
        () => {
          setIntervalAsyncD(invalidHandler)
        }
      )
      assert.throws(
        () => {
          setIntervalAsyncF(invalidHandler)
        }
      )
      assert.throws(
        () => {
          setIntervalAsyncL(invalidHandler)
        }
      )
    }
    for (let invalidInterval of invalidIntervals) {
      assert.throws(
        () => {
          setIntervalAsyncD(
            () => {},
            invalidInterval
          )
        }
      )
      assert.throws(
        () => {
          setIntervalAsyncF(
            () => {},
            invalidInterval
          )
        }
      )
      assert.throws(
        () => {
          setIntervalAsyncL(
            () => {},
            invalidInterval
          )
        }
      )
    }
  })
})
