/*
  Warnings:

  - You are about to drop the column `category_id` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `date_event` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `events` table. All the data in the column will be lost.
  - Added the required column `category` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jam` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaEvent` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pembicara` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "category_id",
DROP COLUMN "date_event",
DROP COLUMN "description",
DROP COLUMN "location",
DROP COLUMN "name",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "jam" TEXT NOT NULL,
ADD COLUMN     "namaEvent" TEXT NOT NULL,
ADD COLUMN     "pembicara" TEXT NOT NULL,
ADD COLUMN     "tanggal" TEXT NOT NULL;
