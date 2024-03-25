import type { PrismaClient } from "@prisma/client";
import type { Session, DefaultSession } from "next-auth";

declare module "next" {
  interface NextApiRequest {
    ctx: {
      session?: Session;
      db: PrismaClient;
    };
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
    };
  }
}
