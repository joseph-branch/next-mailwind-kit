import type { NextApiRequest, NextApiResponse } from "next";

import { createAxiosContext, isRouteHandler } from "~/server/api/axios";

import { appRouter } from "~/server/api/root";

const nextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const context = await createAxiosContext({ req, res });

  req.ctx = {
    ...context,
    session: context.session ?? undefined,
  };

  // Join the path segments with a '/' to form the full route path
  const fullPath = "/" + (req.query.axios as string[]).join("/");

  // Look up the handler directly using the full path
  const handler = appRouter[fullPath];

  if (isRouteHandler(handler)) {
    await handler(req, res);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
};

export default nextApiHandler;
