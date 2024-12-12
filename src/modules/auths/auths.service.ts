import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-auth.dto';
import { UserService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { IAuthResponse, IAuthReturn } from './interfaces/response';

@Injectable()
export class AuthsService {
  constructor(private userService: UserService,
    private jwtService: JwtService
  ) { }

  async register(createUserDto: CreateUserDto): Promise<IAuthReturn> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.createUser(createUserDto);
    //send welcome email to user, 
    // let him know next step too i.e basic kyc
    return {
      token: await this.jwtService.signAsync({ userId: user.id, username: user.username}),
      user
    }

  }

  async login(loginUserDto: LoginUserDto): Promise<IAuthReturn> {
    const { email, password } = loginUserDto
    const user = await this.userService.findUserByField(
      { email },
      ["id","firstname", "lastname", "username", "email", "phonenumber","profilePicture", "password", "createdAt", "updatedAt"],
    );
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials')
    };
    // const {profilePicture} = user
    // user.profilePicture = user.profilePicture?
    delete user.password;
    //login record should be stored later
    return {
      token: await this.jwtService.signAsync({ userId: user.id, username: user.username}),
      user
    }
  }

}
