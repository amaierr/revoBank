import { ConflictException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersRepository } from 'src/modules/users/users.repository';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CONSTANT } from 'src/common/constants/constant-variable';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto){
        // Validate role
        const roles = CONSTANT.ROLE
        type Role = typeof roles[keyof typeof roles]

        if(!Object.values(roles).includes(registerDto.role as Role)){
            throw new NotAcceptableException(ERROR_MESSAGES.AUTH.ROLES_NOT_VALID)
        }
        
        // Validate if user exist
        const existingUser = await this.usersRepository.getUserByEmail(registerDto.email)
        
        if(existingUser){
            throw new ConflictException(ERROR_MESSAGES.USER.ALREADY_EXISTS)
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(registerDto.password, 10)
        registerDto.password = hashedPassword

        return this.usersRepository.createNewUser(registerDto)
    }

    async login(loginDto: LoginDto){
        // Get existing user by email
        const user = await this.usersRepository.getUserByEmail(loginDto.email)
        if(!user){
            throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND)
        }
        
        // Validate password
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password)
        if(!isPasswordValid){
            throw new UnauthorizedException(ERROR_MESSAGES.AUTH.UNAUTHORIZED)
        }

        // Return token
        const payload = {id: user.id, name: user.name, email: user.email, role: user.role}
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
