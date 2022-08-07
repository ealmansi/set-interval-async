import { clearIntervalAsync } from "../clear-interval-async.cjs";
import { setIntervalAsync as setIntervalAsyncDynamic } from "../dynamic/set-interval-async.cjs";
import { setIntervalAsync as setIntervalAsyncFixed } from "../fixed/set-interval-async.cjs";

const setIntervalAsync = setIntervalAsyncDynamic;

const dynamic = {
  setIntervalAsync: setIntervalAsyncDynamic,
};

const fixed = {
  setIntervalAsync: setIntervalAsyncFixed,
};

export { setIntervalAsync, clearIntervalAsync, dynamic, fixed };
