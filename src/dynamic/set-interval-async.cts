import { clearIntervalAsync } from "../clear-interval-async.cjs";
import { SetIntervalAsyncHandler } from "../set-interval-async-handler.cjs";
import { SetIntervalAsyncTimer } from "../set-interval-async-timer.cjs";

export { clearIntervalAsync };
export type { SetIntervalAsyncHandler };
export type { SetIntervalAsyncTimer };

/**
 * Attempts to execute the given handler at regular intervals, while preventing
 * multiple concurrent executions. The handler will never be executed concurrently
 * more than once in any given moment. If the running time of any execution exceeds
 * the desired interval, the following execution will be scheduled as soon as
 * possible; ie. immediately after the previous execution concludes.
 */
export function setIntervalAsync<HandlerArgs extends unknown[]>(
  handler: SetIntervalAsyncHandler<HandlerArgs>,
  intervalMs: number,
  ...handlerArgs: HandlerArgs
): SetIntervalAsyncTimer<HandlerArgs> {
  return SetIntervalAsyncTimer.startTimer<HandlerArgs>(
    "dynamic",
    handler,
    intervalMs,
    ...handlerArgs
  );
}
