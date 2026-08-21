-- CreateEnum
CREATE TYPE "priority" AS ENUM ('low', 'medium', 'high');

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "priority" "priority" NOT NULL DEFAULT 'low';
