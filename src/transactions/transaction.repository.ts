import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { TransferTransactionDto } from "./dto/transfer-transaction.dto";

@Injectable()
export class TransactionsRepository {
    constructor(private prisma: PrismaService) {}

    async createTransaction(createTransactionDto: CreateTransactionDto){
        const result = await this.prisma.transaction.create({
            data:{
                accountNumber: createTransactionDto.accountNumber,
                transactionType: createTransactionDto.transactionType,
                amount: createTransactionDto.amount,
            }
        })

        return result
    }

    async createTransferTransaction(transferTransactionDto: TransferTransactionDto){
        const result = await this.prisma.transaction.create({
            data:{
                accountNumber: transferTransactionDto.accountNumber,
                transactionType: transferTransactionDto.transactionType,
                amount: transferTransactionDto.amount,
                transferTo: transferTransactionDto.transferTo
            }
        })

        return result
    }
}