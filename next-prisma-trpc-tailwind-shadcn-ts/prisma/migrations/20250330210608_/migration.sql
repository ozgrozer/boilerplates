/*
  Warnings:

  - You are about to drop the column `text` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `title` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "text",
ADD COLUMN     "title" TEXT NOT NULL;
