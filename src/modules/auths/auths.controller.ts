import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthsService } from './auths.service';
import {  LoginUserDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { IAuthResponse } from './interfaces/response';
import { Public } from 'src/common/guards/public.guard';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) { }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IAuthResponse> {
    const response = await this.authsService.register(createUserDto)
    return {
      message: "User created successfully",
      data: {
        ...response
      }
    }
  }

  @Public()
  @Post('login')
   async login(@Body() loginUserDto: LoginUserDto): Promise<IAuthResponse> {
    const response = await this.authsService.login(loginUserDto)
    return {
      message: "User login successfully",
      data: {
        ...response
      }
  }

   }
}
