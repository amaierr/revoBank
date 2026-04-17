import { IsAlpha, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
    
    @IsAlpha()
    @IsOptional()
    name: string
    
    @IsEmail()
    @IsOptional()
    email: string
}
