import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { UpdateAccountDto } from "./dto/update-account.dto";

@Injectable()
export class AccountsRepository {
    constructor(private prisma: PrismaService) {}

    async createAccount(userId: string, accountNumber){
        const result = await this.prisma.account.create({
            data:{
                userId: userId,
                accountNumber: accountNumber
            }
        })
        return result
    }

    async getAccountByAccountNumber(accountNumber: string){
        const account = await this.prisma.account.findUnique({
            where: {accountNumber: accountNumber}
        })
        return account
    }

    async addBalance(accountNumber: string, amount: number){
        await this.prisma.account.update({
            where:{accountNumber: accountNumber},
            data: {
                balance: {
                    increment: amount
                }
            }
        })
    }

    async subtractBalance(accountNumber: string, amount: number){
        await this.prisma.account.update({
            where:{accountNumber: accountNumber},
            data: {
                balance: {
                    decrement: amount
                }
            }
        })
    }

    async getAccountByUserId(userId: string){
        return await this.prisma.account.findMany({
            where: {userId: userId}
        })
    }

    async updateAccount(updateAccountDto: UpdateAccountDto){
        return this.prisma.account.update({
            where:{accountNumber: updateAccountDto.accountNumber},
            data:{
                lowerLimit:updateAccountDto.lowerLimit,
                upperLimit:updateAccountDto.upperLimit
            }
        })
    }

    async deleteAccount(accountNumber: string){
        return await this.prisma.account.delete({
            where: {accountNumber: accountNumber}
        })
    }

    async findAll(){
        return await this.prisma.account.findMany({
            include: { 
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })
    }
}