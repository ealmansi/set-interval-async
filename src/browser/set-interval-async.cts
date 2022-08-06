import { clearIntervalAsync } from "../clear-interval-async.cjs";
import { setIntervalAsync as setIntervalAsyncDynamic } from "../dynamic/set-interval-async.cjs";
import { setIntervalAsync as setIntervalAsyncFixed } from "../fixed/set-interval-async.cjs";
import type { SetIntervalAsyncHandler } from "../set-interval-async-handler.cjs";
import type { SetIntervalAsyncTimer } from "../set-interval-async-timer.cjs";

type SetIntervalAsyncFn<HandlerArgs extends unknown[]> = (
  handler: SetIntervalAsyncHandler<HandlerArgs>,
  intervalMs: number,
  ...handlerArgs: HandlerArgs
) => SetIntervalAsyncTimer<HandlerArgs>;

type UntypedSetIntervalAsyncFn = (
  handler: unknown,
  intervalMs: unknown,
  ...handlerArgs: unknown[]
) => SetIntervalAsyncTimer<unknown[]>;

function withValidation<HandlerArgs extends unknown[]>(
  setIntervalAsync: SetIntervalAsyncFn<HandlerArgs>
): UntypedSetIntervalAsyncFn {
  return (handler, intervalMs, ...handlerArgs) => {
    if (!(typeof handler === "function")) {
      throw new TypeError("Handler is not a function.");
    }
    if (!(typeof intervalMs === "number")) {
      throw new TypeError("Interval is not a number.");
    }
    return setIntervalAsync(
      handler as SetIntervalAsyncHandler<HandlerArgs>,
      intervalMs,
      ...(handlerArgs as HandlerArgs)
    );
  };
}

const setIntervalAsync = withValidation(setIntervalAsyncDynamic);

export const dynamic = {
  setIntervalAsync: withValidation(setIntervalAsyncDynamic),
};

export const fixed = {
  setIntervalAsync: withValidation(setIntervalAsyncFixed),
};

export { setIntervalAsync, clearIntervalAsync };
