import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { RegisterDto } from "src/auth/dto/register.dto";

@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) {}

    async findById(userId: string){
        const user = await this.prisma.user.findUnique({
            where: {id: userId}
        })

        return user
    }

    async getUserByEmail(email: string){
        return await this.prisma.user.findUnique({
            where: { email: email },
        });
    }

    async createNewUser(registerDto: RegisterDto){
        return await this.prisma.user.create({
            data: {
                email: registerDto.email,
                name: registerDto.name,
                password: registerDto.password
            }
        })
    }
}