
import { clearIntervalAsync } from './clear'
import { setIntervalAsync as setIntervalAsyncD } from './dynamic'
import { setIntervalAsync as setIntervalAsyncF } from './fixed'
import { setIntervalAsync as setIntervalAsyncL } from './legacy'
import SetIntervalAsyncError from './error'

let dynamic = { setIntervalAsync: setIntervalAsyncD }
let fixed = { setIntervalAsync: setIntervalAsyncF }
let legacy = { setIntervalAsync: setIntervalAsyncL }

export {
  dynamic,
  fixed,
  legacy,
  clearIntervalAsync,
  SetIntervalAsyncError
}
