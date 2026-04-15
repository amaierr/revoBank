import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersRepository } from 'src/users/users.repository';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto){
        const existingUser = await this.usersRepository.getUserByEmail(registerDto.email)
        
        if(existingUser){
            throw new NotFoundException(ERROR_MESSAGES.USER.ALREADY_EXISTS)
        }
        
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        registerDto.password = hashedPassword

        return this.usersRepository.createNewUser(registerDto)
    }

    async login(loginDto: LoginDto){
        const user = await this.usersRepository.getUserByEmail(loginDto.email)
        if(!user){
            throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND)
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password)
        if(!isPasswordValid){
            throw new UnauthorizedException(ERROR_MESSAGES.AUTH.UNAUTHORIZED)
        }

        const payload = {id: user.id, name: user.name, email: user.email, role: user.role}
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
