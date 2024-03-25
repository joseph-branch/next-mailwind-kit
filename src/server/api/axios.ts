import type { NextApiRequest, NextApiResponse } from "next";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export interface AxiosContextOptions {
  req: NextApiRequest;
  res: NextApiResponse;
}

export const createAxiosContext = async (opts: AxiosContextOptions) => {
  const session = await getServerAuthSession({ req: opts.req, res: opts.res });

  return {
    session,
    db,
  };
};

type RouteHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => void | Promise<void>;

export type BaseRouter = {
  [key: string]: RouteHandler | BaseRouter;
};

export const createRouter = (
  routerObject: object,
  parentKey = "",
): BaseRouter => {
  const processedRouter: BaseRouter = {};

  for (const [key, value] of Object.entries(routerObject)) {
    const normalizedKey = key.startsWith("/") ? key : `/${key}`;
    const fullKey =
      normalizedKey === "/" ? parentKey : `${parentKey}${normalizedKey}`;

    if (isRouteHandler(value)) {
      processedRouter[fullKey] = value;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.assign(processedRouter, createRouter(value, `${fullKey}`));
    }
  }

  return processedRouter;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isRouteHandler = (value: any): value is RouteHandler => {
  return typeof value === "function";
};
