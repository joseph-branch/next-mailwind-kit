/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRouter } from "./axios";
import { helloRouter } from "./routers/helloRouter";

// Needed to resolve the type of the router
const baseRouter = {
  hello: helloRouter,
};

export const appRouter = createRouter(baseRouter);

type ExtractRoutes<T, Prefix extends string = ""> =
  T extends Record<string, any>
    ? {
        [K in keyof T]: T[K] extends (...args: any[]) => any
          ? K extends "/"
            ? `${Prefix}`
            : `${Prefix}${K & string}`
          : ExtractRoutes<
              T[K],
              K extends "/" ? Prefix : `${Prefix}/${K & string}`
            >;
      }[keyof T]
    : never;

export type AppRouterPaths = ExtractRoutes<typeof baseRouter>;
