import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/auth/decorator/user.decorator';
import { LoggedInUserDto } from './dto/logged-in-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  findProfile(@User() user: LoggedInUserDto) {
    return user;
  }

  @Patch('profile')
  update(@User() user: LoggedInUserDtooo, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }
}
