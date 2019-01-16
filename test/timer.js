import {
  clearIntervalAsync,
  SetIntervalAsyncTimer
} from '..'

describe('SetIntervalAsyncTimer', async () => {

  it('should clear an uninitialized timer without errors', async () => {
    await clearIntervalAsync(new SetIntervalAsyncTimer())
  })

})
