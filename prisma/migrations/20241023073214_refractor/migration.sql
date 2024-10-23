/*
  Warnings:

  - You are about to drop the `cart_items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `count` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_id` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_item_id_fkey";

-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "count" INTEGER NOT NULL,
ADD COLUMN     "item_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "cart_items";

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
