import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { User } from 'src/auth/decorator/user.decorator';
import { LogedInUserDto } from '../users/dto/loged-in-user.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { CONSTANT } from 'src/common/constants/constant-variable';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@User() user: LogedInUserDto) {
    return this.accountsService.create(user.id);
  }

  @Get('/account-number/:account_number')
  findOne(@User() user: LogedInUserDto, @Param('account_number') accountNumber: string) {
    return this.accountsService.findOne(user, accountNumber);
  }
  
  @Get()
  findAllByUserId(@User() user: LogedInUserDto) {
    return this.accountsService.findAllByUserId(user.id);
  }
  
  @Roles(CONSTANT.ROLE.ADMIN)
  @Get('/all-accounts')
  findAll() {
    return this.accountsService.findAll();
  }

  @Roles(CONSTANT.ROLE.ADMIN)
  @Patch()
  update(@Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(updateAccountDto);
  }

  @Delete(':account_number')
  remove(@User() user: LogedInUserDto, @Param('account_number') accountNumber: string) {
    return this.accountsService.remove(user, accountNumber);
  }
}
