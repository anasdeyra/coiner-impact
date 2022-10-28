import { DefaultSession } from "next-auth";
import { User as PrismaUser } from "prisma/prisma-client";

declare module "next-auth" {
  interface Session {
    user: PrismaUser & DefaultSession["user"];
  }
  interface User extends PrismaUser {}
}
