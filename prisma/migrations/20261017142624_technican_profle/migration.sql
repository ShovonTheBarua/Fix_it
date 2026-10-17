/*
  Warnings:

  - Changed the type of `skills` on the `technician_Profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "technician_Profiles" DROP COLUMN "skills",
ADD COLUMN     "skills" JSONB NOT NULL,
ALTER COLUMN "pricing" SET DATA TYPE TEXT;
