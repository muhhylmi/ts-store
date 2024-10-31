/*
  Warnings:

  - The primary key for the `prders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `prders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_order_id_fkey";

-- AlterTable
ALTER TABLE "carts" ALTER COLUMN "order_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "prders" DROP CONSTRAINT "prders_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "prders_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "prders_id_key" ON "prders"("id");

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "prders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
