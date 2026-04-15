import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountsRepository } from './accounts.repository';
import { UsersRepository } from 'src/users/users.repository';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly userRepository: UsersRepository
  ) {}



  async create(createAccountDto: CreateAccountDto) {
    const user = await this.userRepository.findById(createAccountDto.userId) 
    
    if(!user){
      throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND)
    }

    const random10 = Math.floor(1000000000 + Math.random() * 9000000000);
    createAccountDto.accountNumber = random10.toString();

    return this.accountsRepository.createAccount(createAccountDto);
  }



  findAll() {
    return `This action returns all accounts`;
  }



  findAllByUserId(userId: string) {
    return this.accountsRepository.getAccountByUserId(userId)
  }



  findOne(accountNumber: string) {
    return this.accountsRepository.getAccountByAccountNumber(accountNumber)
  }



  update(updateAccountDto: UpdateAccountDto) {
    return this.accountsRepository.updateAccount(updateAccountDto);
  }


  
  remove(accountNumber: string) {
    return this.accountsRepository.deleteAccount(accountNumber)
  }
}
