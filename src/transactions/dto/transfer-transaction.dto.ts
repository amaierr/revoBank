import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator"
import { TransactionType } from "generated/prisma/enums"

export class TransferTransactionDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(10)
    accountNumber: string
    transactionType: TransactionType

    @IsNotEmpty()
    @IsNumber()
    amount: number

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(10)
    transferTo: string
}
