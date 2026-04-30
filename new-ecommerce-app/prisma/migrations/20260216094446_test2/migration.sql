-- CreateTable
CREATE TABLE "Shop" (
    "id" TEXT NOT NULL,
    "shopDomain" TEXT NOT NULL,
    "accessToken" TEXT,
    "razorpayConnected" BOOLEAN NOT NULL DEFAULT false,
    "razorpayAccountId" TEXT,
    "keyId" TEXT,
    "keySecret" TEXT,
    "mode" TEXT NOT NULL DEFAULT 'test',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_shopDomain_key" ON "Shop"("shopDomain");
