import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transaction.repository';
import { AccountsRepository } from 'src/accounts/accounts.repository';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository, AccountsRepository],
})
export class TransactionsModule {}
