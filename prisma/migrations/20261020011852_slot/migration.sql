/*
  Warnings:

  - A unique constraint covering the columns `[slotId]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slotId` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "slotId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bookings_slotId_key" ON "bookings"("slotId");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "technician_availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
