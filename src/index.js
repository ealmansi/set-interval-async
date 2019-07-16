/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

import { clearIntervalAsync } from './clear'
import { setIntervalAsync as setIntervalAsyncD } from './dynamic'
import { setIntervalAsync as setIntervalAsyncF } from './fixed'
import { setIntervalAsync as setIntervalAsyncL } from './legacy'
import SetIntervalAsyncError from './error'
import SetIntervalAsyncTimer from './timer'

const dynamic = { setIntervalAsync: setIntervalAsyncD }
const fixed = { setIntervalAsync: setIntervalAsyncF }
const legacy = { setIntervalAsync: setIntervalAsyncL }

export {
  dynamic,
  fixed,
  legacy,
  clearIntervalAsync,
  SetIntervalAsyncError,
  SetIntervalAsyncTimer
}
