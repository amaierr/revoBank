import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
    accountNumber: string

    @IsString()
    @IsNotEmpty()
    userId: string
}
