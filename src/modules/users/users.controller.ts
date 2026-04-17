import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/auth/decorator/user.decorator';
import { LogedInUserDto } from './dto/loged-in-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  findProfile(@User() user: LogedInUserDto) {
    return user;
  }

  @Patch('profile')
  update(@User() user: LogedInUserDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }
}
