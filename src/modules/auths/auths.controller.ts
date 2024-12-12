import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthsService } from './auths.service';
import {  LoginUserDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {

    return {message: "login success", user: this.authsService.register(createUserDto)}
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    console.log('JWT_EXPIRES:', process.env.JWT_EXPIRES);
    return this.authsService.login(loginUserDto)
  }
  // @Get()
  // findAll() {
  //   return this.authsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authsService.update(+id, updateAuthDto);
  // }

}
