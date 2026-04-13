import { Injectable } from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-account.dto";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class AccountsRepository {
    constructor(private prisma: PrismaService) {}

    async createAccount(createAccountDto: CreateAccountDto){
        const result = await this.prisma.account.create({
            data:{
                userId: createAccountDto.userId,
                accountNumber: createAccountDto.accountNumber
            }
        })
        return result
    }
}