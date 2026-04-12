import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
    accountNumber: number

    @IsString()
    @IsNotEmpty()
    userId: string
}
