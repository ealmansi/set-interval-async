import { clearIntervalAsync } from "../clear-interval-async.cjs";
import { SetIntervalAsyncHandler } from "../set-interval-async-handler.cjs";
import { SetIntervalAsyncTimer } from "../set-interval-async-timer.cjs";

export { clearIntervalAsync };
export type { SetIntervalAsyncHandler };
export type { SetIntervalAsyncTimer };

/**
 * Executes the given handler at fixed intervals, while preventing
 * multiple concurrent executions. The handler will never be executed
 * concurrently more than once in any given moment, providing a fixed
 * time interval between the end of a given execution and the start of
 * the following one.
 */
export function setIntervalAsync<HandlerArgs extends unknown[]>(
  handler: SetIntervalAsyncHandler<HandlerArgs>,
  intervalMs: number,
  ...handlerArgs: HandlerArgs
): SetIntervalAsyncTimer<HandlerArgs> {
  return SetIntervalAsyncTimer.startTimer<HandlerArgs>(
    "fixed",
    handler,
    intervalMs,
    ...handlerArgs
  );
}
