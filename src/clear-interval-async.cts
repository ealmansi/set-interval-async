import { SetIntervalAsyncTimer } from "./set-interval-async-timer.cjs";

/**
 * Stops an execution cycle started by setIntervalAsync.
 * Any ongoing function executions will run until completion,
 * but all future ones will be cancelled.
 */
export async function clearIntervalAsync<Args extends unknown[]>(
  timer: SetIntervalAsyncTimer<Args>
): Promise<void> {
  if (!(timer instanceof SetIntervalAsyncTimer)) {
    throw new TypeError(
      "First argument is not an instance of SetIntervalAsyncTimer"
    );
  }
  await SetIntervalAsyncTimer.stopTimer(timer);
}
