import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from './transaction.repository';
import { TransactionType } from 'generated/prisma/enums';
import { AccountsRepository } from 'src/accounts/accounts.repository';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import { TransferTransactionDto } from './dto/transfer-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly accountsRepository: AccountsRepository
  ){}

  async deposit(createTransactionDto: CreateTransactionDto) {
    const account = await this.accountsRepository.getAccountByAccountNumber(createTransactionDto.accountNumber)
    if(!account){
      throw new NotFoundException(ERROR_MESSAGES.ACCOUNT.NOT_FOUND + createTransactionDto.accountNumber)
    }

    this.accountsRepository.addBalance(account.accountNumber, createTransactionDto.amount)
    createTransactionDto.transactionType = TransactionType.Deposit
    
    return this.transactionsRepository.createTransaction(createTransactionDto)
  }

  async withdraw(createTransactionDto: CreateTransactionDto) {
    const account = await this.accountsRepository.getAccountByAccountNumber(createTransactionDto.accountNumber)
    if(!account){
      throw new NotFoundException(ERROR_MESSAGES.ACCOUNT.NOT_FOUND + createTransactionDto.accountNumber)
    }

    if(account.balance.lessThan(createTransactionDto.amount)){
      throw new NotFoundException(ERROR_MESSAGES.TRANSACTION.INSUFFICIENT_BALANCE)
    }

    this.accountsRepository.subtractBalance(account.accountNumber, createTransactionDto.amount)
    createTransactionDto.transactionType = TransactionType.Withdraw
    
    return this.transactionsRepository.createTransaction(createTransactionDto)
  }

  async transfer(transferTransactionDto: TransferTransactionDto) {
    const account = await this.accountsRepository.getAccountByAccountNumber(transferTransactionDto.accountNumber)
    if(!account){
      throw new NotFoundException(ERROR_MESSAGES.ACCOUNT.NOT_FOUND + transferTransactionDto.accountNumber)
    }

    if(account.balance.lessThan(transferTransactionDto.amount)){
      throw new NotFoundException(ERROR_MESSAGES.TRANSACTION.INSUFFICIENT_BALANCE)
    }

    const transferToAccount = await this.accountsRepository.getAccountByAccountNumber(transferTransactionDto.transferTo)
    if(!transferToAccount){
      throw new NotFoundException(ERROR_MESSAGES.ACCOUNT.NOT_FOUND + transferTransactionDto.transferTo)
    }
    
    this.accountsRepository.subtractBalance(account.accountNumber, transferTransactionDto.amount)
    this.accountsRepository.addBalance(transferToAccount.accountNumber, transferTransactionDto.amount)

    transferTransactionDto.transactionType = TransactionType.Transfer
    return this.transactionsRepository.createTransferTransaction(transferTransactionDto)
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
