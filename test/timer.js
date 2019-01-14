let {
  clearIntervalAsync,
  SetIntervalAsyncTimer
} = require('..')

describe('SetIntervalAsyncTimer', async () => {

  it('should clear an uninitialized timer without errors', async () => {
    await clearIntervalAsync(new SetIntervalAsyncTimer())
  })
})
