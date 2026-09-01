/*
  Warnings:

  - You are about to drop the column `isRequired` on the `MenuAddonCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AddonCategory" ADD COLUMN     "isRequired" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "MenuAddonCategory" DROP COLUMN "isRequired";
