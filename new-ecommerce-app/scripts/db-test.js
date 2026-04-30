import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to database");

    // Raw query (bypasses model issues)
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Raw query works:", result);

    // Model query
    const count = await prisma.session.count();
    console.log("✅ Session table reachable. Row count:", count);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
