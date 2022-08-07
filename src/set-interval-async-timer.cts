import { SetIntervalAsyncStrategy } from "./set-interval-async-strategy.cjs";
import { SetIntervalAsyncHandler } from "./set-interval-async-handler.cjs";

declare type NativeTimeout = unknown;

declare function setTimeout(
  handler: (...args: unknown[]) => void,
  delayMs: number,
  ...args: unknown[]
): NativeTimeout;

declare function clearTimeout(timeout: NativeTimeout): void;

const MIN_INTERVAL_MS = 10;
const MAX_INTERVAL_MS = 2147483647;

export class SetIntervalAsyncTimer<HandlerArgs extends unknown[]> {
  #timeout: NativeTimeout | undefined = undefined;
  #promise: Promise<void> | undefined = undefined;
  #stopped = false;

  static startTimer<HandlerArgs extends unknown[]>(
    strategy: SetIntervalAsyncStrategy,
    handler: SetIntervalAsyncHandler<HandlerArgs>,
    intervalMs: number,
    ...handlerArgs: HandlerArgs
  ): SetIntervalAsyncTimer<HandlerArgs> {
    intervalMs = Math.min(
      Math.max(Math.trunc(intervalMs), MIN_INTERVAL_MS),
      MAX_INTERVAL_MS
    );
    const timer = new SetIntervalAsyncTimer<HandlerArgs>();
    timer.#scheduleTimeout(
      strategy,
      handler,
      intervalMs,
      intervalMs,
      ...handlerArgs
    );
    return timer;
  }

  static async stopTimer<HandlerArgs extends unknown[]>(
    timer: SetIntervalAsyncTimer<HandlerArgs>
  ): Promise<void> {
    timer.#stopped = true;
    if (timer.#timeout) {
      clearTimeout(timer.#timeout);
    }
    if (timer.#promise) {
      await timer.#promise;
    }
  }

  #scheduleTimeout(
    strategy: SetIntervalAsyncStrategy,
    handler: SetIntervalAsyncHandler<HandlerArgs>,
    intervalMs: number,
    delayMs: number,
    ...handlerArgs: HandlerArgs
  ): void {
    this.#timeout = setTimeout(async () => {
      this.#timeout = undefined;
      this.#promise = this.#runHandlerAndScheduleTimeout(
        strategy,
        handler,
        intervalMs,
        ...handlerArgs
      );
      await this.#promise;
      this.#promise = undefined;
    }, delayMs);
  }

  async #runHandlerAndScheduleTimeout(
    strategy: SetIntervalAsyncStrategy,
    handler: SetIntervalAsyncHandler<HandlerArgs>,
    intervalMs: number,
    ...handlerArgs: HandlerArgs
  ): Promise<void> {
    const startTimeMs = new Date().getTime();
    try {
      await handler(...handlerArgs);
    } finally {
      if (!this.#stopped) {
        const executionTimeMs = new Date().getTime() - startTimeMs;
        const delayMs =
          strategy === "dynamic"
            ? intervalMs > executionTimeMs
              ? intervalMs - executionTimeMs
              : 0
            : intervalMs;
        this.#scheduleTimeout(
          strategy,
          handler,
          intervalMs,
          delayMs,
          ...handlerArgs
        );
      }
    }
  }
}
