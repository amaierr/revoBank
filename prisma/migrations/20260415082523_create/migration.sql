-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Customer', 'Admin');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Customer';
