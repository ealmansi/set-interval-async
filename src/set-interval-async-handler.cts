export type SetIntervalAsyncHandler<HandlerArgs extends unknown[]> = (
  ...handlerArgs: HandlerArgs
) => void | Promise<void>;
