import assert from "assert/strict";
import { setIntervalAsync, clearIntervalAsync } from "set-interval-async";
import {
  setIntervalAsync as setIntervalAsyncDynamic,
  clearIntervalAsync as clearIntervalAsyncDynamic,
} from "set-interval-async/dynamic";
import {
  setIntervalAsync as setIntervalAsyncFixed,
  clearIntervalAsync as clearIntervalAsyncFixed,
} from "set-interval-async/fixed";

describe("Exports", () => {
  it("should export setIntervalAsync and clearIntervalAsync from set-interval-async/dynamic ", () => {
    assert.ok(setIntervalAsyncDynamic);
    assert.ok(clearIntervalAsyncDynamic);
  });

  it("should export setIntervalAsync and clearIntervalAsync from set-interval-async/fixed ", () => {
    assert.ok(setIntervalAsyncFixed);
    assert.ok(clearIntervalAsyncFixed);
  });

  it("should export dynamic setIntervalAsync and clearIntervalAsync from set-interval-async ", () => {
    assert.equal(setIntervalAsync, setIntervalAsyncDynamic);
    assert.equal(clearIntervalAsync, clearIntervalAsyncDynamic);
  });
});
