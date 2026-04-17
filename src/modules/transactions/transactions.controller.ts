import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransferTransactionDto } from './dto/transfer-transaction.dto';
import { User } from 'src/auth/decorator/user.decorator';
import { LoggedInUserDto } from '../users/dto/logged-in-user.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/deposit')
  deposit(@User() user: LoggedInUserDto, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.deposit(user, createTransactionDto);
  }

  @Post('/withdraw')
  withdraw(@User() user: LoggedInUserDto, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.withdraw(user, createTransactionDto);
  }

  @Post('/transfer')
  transfer(@User() user: LoggedInUserDto, @Body() transferTransactionDto: TransferTransactionDto) {
    return this.transactionsService.transfer(user, transferTransactionDto);
  }

  @Get()
  getUserAccountsTransactions(@User() user: LoggedInUserDto) {
    return this.transactionsService.getUserAccountsTransactions(user.id);
  }

  @Get(':account_number')
  getUserTransactionByAccountNumber(@User() user: LoggedInUserDto, @Param('account_number') accountNumber: string) {
    return this.transactionsService.getUserTransactionByAccountNumber(user, accountNumber);
  }
}
