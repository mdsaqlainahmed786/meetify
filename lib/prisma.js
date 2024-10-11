import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
// next js uses hot reloading hence, it makes new prisma client every single time in development mode.So in dev use the same client
