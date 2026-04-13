import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule, UsersModule, AccountsModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
