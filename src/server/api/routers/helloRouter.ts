import type { NextApiRequest, NextApiResponse } from "next";

const hello = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ greeting: "Hello developer, I am ready to use!" });
};

export const helloRouter = {
  "/": hello,
};
