-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('Deposit', 'Withdraw', 'Transfer');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "account_number" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "balance" MONEY NOT NULL DEFAULT 0,
    "lower_limit" MONEY NOT NULL DEFAULT 10000,
    "upper_limit" MONEY NOT NULL DEFAULT 100000,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_number")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "transaction_type" "TransactionType" NOT NULL,
    "account_number" INTEGER NOT NULL,
    "amount" MONEY NOT NULL,
    "transfer_to" INTEGER,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_number_fkey" FOREIGN KEY ("account_number") REFERENCES "accounts"("account_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_transfer_to_fkey" FOREIGN KEY ("transfer_to") REFERENCES "accounts"("account_number") ON DELETE SET NULL ON UPDATE CASCADE;
