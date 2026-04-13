import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountsRepository } from './accounts.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  create(createAccountDto: CreateAccountDto) {
    const random10 = Math.floor(1000000000 + Math.random() * 9000000000);
    createAccountDto.accountNumber = random10;

    return this.accountsRepository.createAccount(createAccountDto);
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
