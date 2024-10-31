/*
  Warnings:

  - You are about to drop the `prders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_order_id_fkey";

-- DropForeignKey
ALTER TABLE "prders" DROP CONSTRAINT "prders_user_id_fkey";

-- DropTable
DROP TABLE "prders";

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_key" ON "orders"("id");

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
