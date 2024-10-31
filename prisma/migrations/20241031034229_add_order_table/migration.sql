-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "order_id" INTEGER;

-- CreateTable
CREATE TABLE "prders" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "prders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prders" ADD CONSTRAINT "prders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
