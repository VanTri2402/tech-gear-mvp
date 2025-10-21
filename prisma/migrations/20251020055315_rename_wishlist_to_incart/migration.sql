/*
  Warnings:

  - You are about to drop the `_ProductToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_ProductToUser" DROP CONSTRAINT "_ProductToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ProductToUser" DROP CONSTRAINT "_ProductToUser_B_fkey";

-- DropTable
DROP TABLE "public"."_ProductToUser";

-- CreateTable
CREATE TABLE "public"."_CartItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CartItems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CartItems_B_index" ON "public"."_CartItems"("B");

-- AddForeignKey
ALTER TABLE "public"."_CartItems" ADD CONSTRAINT "_CartItems_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CartItems" ADD CONSTRAINT "_CartItems_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
