-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "transaction_date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
