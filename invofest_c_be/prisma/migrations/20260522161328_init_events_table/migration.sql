/*
  Warnings:

  - You are about to drop the column `data_event` on the `events` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `events` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date_event` on the `events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "data_event",
ADD COLUMN     "category_id" INTEGER NOT NULL,
DROP COLUMN "date_event",
ADD COLUMN     "date_event" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
