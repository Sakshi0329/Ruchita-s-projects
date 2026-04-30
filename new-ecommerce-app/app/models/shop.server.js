import prisma from "../db.server";

export async function getShop(shopDomain) {
  return prisma.shop.findUnique({
    where: { shopDomain },
  });
}

export async function upsertShop(shopDomain, data) {
  return prisma.shop.upsert({
    where: { shopDomain },
    update: data,
    create: {
      shopDomain,
      ...data,
    },
  });
}
