import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from './transaction.repository';
import { TransactionType } from 'generated/prisma/enums';
import { AccountsRepository } from 'src/modules/accounts/accounts.repository';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import { TransferTransactionDto } from './dto/transfer-transaction.dto';
import { LogedInUserDto } from '../users/dto/loged-in-user.dto';
import { CONSTANT } from 'src/common/constants/constant-variable';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly accountsRepository: AccountsRepository
  ){}
  

  /* ---------------- Deposit money to account ---------------- */
  /* START */
  async deposit(user: LogedInUserDto, createTransactionDto: CreateTransactionDto) {
    // Validate account exist
    const account = await this.accountsRepository.getAccountByAccountNumber(createTransactionDto.accountNumber)
    if(!account){
      throw new NotFoundException(ERROR_MESSAGES.ACCOUNT.NOT_FOUND + createTransactionDto.accountNumber)
    }

    // Validate account belongs to user
    if(!(user.id === account?.userId)){
      throw new ForbiddenException(ERROR_MESSAGES.TRANSACTION.TRANSACTION_FORBIDDEN)
    }

    // Add balance
    this.accountsRepository.addBalance(account.accountNumber, createTransactionDto.amount)
    
    // Create transaction history
    createTransactionDto.transactionType = TransactionType.Deposit
    return this.transactionsRepository.createTransaction(createTransactionDto)
  }
  /* END */
  

  /* ---------------- Withdraw money from account ---------------- */
  /* START */
  async withdraw(user: LogedInUserDto, createTransactionDto: CreateTransactionDto) {
    // Validate account exist
    const account = await this.accountsRepository.getAccountByAccountNumber(createTransactionDto.accountNumber)
    if(!account){
      throw new NotFoundException(ERROR_MESSAGES.ACCOUNT.NOT_FOUND + createTransactionDto.accountNumber)
    }

    // Validate account belongs to user
    if(!(user.id === account?.userId)){
      throw new ForbiddenException(ERROR_MESSAGES.TRANSACTION.TRANSACTION_FORBIDDEN)
    }

    // Validate balance is enough
    if(account.balance.lessThan(createTransactionDto.amount)){
      throw new NotFoundException(ERROR_MESSAGES.TRANSACTION.INSUFFICIENT_BALANCE)
    }

    // Subtract balance
    this.accountsRepository.subtractBalance(account.accountNumber, createTransactionDto.amount)
    
    // Create transaction history
    createTransactionDto.transactionType = TransactionType.Withdraw
    return this.transactionsRepository.createTransaction(createTransactionDto)
  }
  /* END */


  /* ---------------- Transfer money ---------------- */
  /* START */
  async transfer(user: LogedInUserDto, transferTransactionDto: TransferTransactionDto) {
    // Validate origin account exist
    const account = await this.accountsRepository.getAccountByAccountNumber(transferTransactionDto.accountNumber)
    if(!account){
      throw new NotFoundException(ERROR_MESSAGES.ACCOUNT.NOT_FOUND + transferTransactionDto.accountNumber)
    }

    // Validate origin account belongs to user
    if(!(user.id === account?.userId)){
      throw new ForbiddenException(ERROR_MESSAGES.TRANSACTION.TRANSACTION_FORBIDDEN)
    }

    // Validate origin account balance is enough
    if(account.balance.lessThan(transferTransactionDto.amount)){
      throw new NotFoundException(ERROR_MESSAGES.TRANSACTION.INSUFFICIENT_BALANCE)
    }

    // Validate destination account exist
    const transferToAccount = await this.accountsRepository.getAccountByAccountNumber(transferTransactionDto.transferTo)
    if(!transferToAccount){
      throw new NotFoundException(ERROR_MESSAGES.ACCOUNT.NOT_FOUND + transferTransactionDto.transferTo)
    }
    
    // Subtract origin account balance & add destination account balance
    this.accountsRepository.subtractBalance(account.accountNumber, transferTransactionDto.amount)
    this.accountsRepository.addBalance(transferToAccount.accountNumber, transferTransactionDto.amount)

    // Create transaction history
    transferTransactionDto.transactionType = TransactionType.Transfer
    return this.transactionsRepository.createTransferTransaction(transferTransactionDto)
  }
  /* END */

  async getUserAccountsTransactions(userId: string) {
    return await this.transactionsRepository.getUserAccountsTransactions(userId)
  }

  async getUserTransactionByAccountNumber(user: LogedInUserDto, accountNumber: string) {
    // Validate account exist
    const account = await this.accountsRepository.getAccountByAccountNumber(accountNumber)
    if(!account){
      throw new NotFoundException(ERROR_MESSAGES.ACCOUNT.NOT_FOUND + accountNumber)
    }

    // Validate account belongs to user
    if(!(user.id === account?.userId) || user.role === CONSTANT.ROLE.ADMIN){
      throw new ForbiddenException(ERROR_MESSAGES.TRANSACTION.HISTORY_FORBIDDEN)
    }

    return this.transactionsRepository.getUserTransactionByAccountNumber(accountNumber)
  }
}
