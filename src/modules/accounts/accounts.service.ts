import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountsRepository } from './accounts.repository';
import { UsersRepository } from 'src/modules/users/users.repository';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import { LogedInUserDto } from '../users/dto/loged-in-user.dto';
import { CONSTANT } from 'src/common/constants/constant-variable';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly userRepository: UsersRepository
  ) {}


  /* ---------------- Create new accout ---------------- */
  /* START */
  async create(userId: string) {
    const user = await this.userRepository.findById(userId) 
    
    if(!user){
      throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND)
    }

    const random10 = Math.floor(1000000000 + Math.random() * 9000000000);
    const accountNumber = random10.toString();

    return this.accountsRepository.createAccount(userId, accountNumber);
  }
  /* END */


  /* ---------------- Find all existing account ---------------- */
  findAll() {
    return this.accountsRepository.findAll()
  }


  /* ---------------- Find all loged in user account ---------------- */
  findAllByUserId(userId: string) {
    return this.accountsRepository.getAccountByUserId(userId)
  }


  /* ---------------- Find one account ---------------- */
  /* START */
  async findOne(user: LogedInUserDto, accountNumber: string) {
    const account = await this.accountsRepository.getAccountByAccountNumber(accountNumber)

    if(!account){
      throw new NotFoundException(ERROR_MESSAGES.ACCOUNT.NOT_FOUND + accountNumber)
    }

    if(!(user.id === account?.userId)){
      throw new ForbiddenException(ERROR_MESSAGES.USER.VIEW_FORBIDDEN)
    }

    return account
  }
  /* END */


  /* ---------------- Update account ---------------- */
  async update(updateAccountDto: UpdateAccountDto) {
    const account = await this.accountsRepository.getAccountByAccountNumber(updateAccountDto.accountNumber)
    if(!account){
      throw new NotFoundException(ERROR_MESSAGES.ACCOUNT.NOT_FOUND + updateAccountDto.accountNumber)
    }

    return this.accountsRepository.updateAccount(updateAccountDto);
  }
  

  /* ---------------- Delete account ---------------- */
  async remove(user: LogedInUserDto, accountNumber: string) {
    const account = await this.accountsRepository.getAccountByAccountNumber(accountNumber)
    if(!account){
      throw new NotFoundException(ERROR_MESSAGES.ACCOUNT.NOT_FOUND + accountNumber)
    }

    if(!(account.userId === user.id) || user.role === CONSTANT.ROLE.ADMIN){
      throw new ForbiddenException(ERROR_MESSAGES.ACCOUNT.DELETE_FORBIDDEN)
    }

    return this.accountsRepository.deleteAccount(accountNumber)
  }
}
