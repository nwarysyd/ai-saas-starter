import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

function createPrismaClient() {
  // Prisma 7: connection URL must be passed via adapter, NOT via schema.prisma
  const connectionString =
    process.env.DATABASE_URL || process.env.DIRECT_URL;

  if (!connectionString) {
    throw new Error(
      "Missing database connection string. Set DATABASE_URL in your environment variables."
    );
  }

  const adapter = new PrismaPg({ connectionString });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
