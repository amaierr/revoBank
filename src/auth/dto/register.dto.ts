import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from 'generated/prisma/enums';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    role: Role
}
