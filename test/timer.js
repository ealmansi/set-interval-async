/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

import {
  clearIntervalAsync,
  SetIntervalAsyncTimer
} from '..'

describe('SetIntervalAsyncTimer', async () => {

  it('should clear an uninitialized timer without errors', async () => {
    await clearIntervalAsync(new SetIntervalAsyncTimer())
  })

})
