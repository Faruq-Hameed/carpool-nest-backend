import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthsService } from './auths.service';

import { CreateUserDto } from 'src/shared/dto/create-user.dto';
import { Public } from 'src/common/guards/public.guard';
import { ChangePasswordDto } from './dto/change-password-dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @MessagePattern({ cmd: 'create-auth' })
  async create(createUserDto: CreateUserDto) {
    return await this.authsService.register(createUserDto);
  }

  // @Post('login')
  // async login(@Body() loginUserDto: LoginUserDto) {
  //   return await this.authsService.login(loginUserDto);
  // }

  // @Post('forget-password')
  // async forgetPassword(
  //   @Body() changePasswordDto: ChangePasswordDto,
  // ) {
  //   return await this.authsService.resetPassword(changePasswordDto); //this returns void so normal listen is okay
  // }
  // @Post('otp-login')
  // async otpLogin(@Body() otpLoginDto: OtpLoginDto) {
  //   return await this.authsService.otpLogin(otpLoginDto);

  // }

  @Get('check-user')
  async checkUser(@Body() data: any): Promise<any> {
    console.log('request made to auth microservice from controller');
    return await this.authsService.checkUser({ username: 'john' });
  }
  @Post('emit-login')
  async emitLogin(@Body() body: { username: string }) {
    console.log('Emitted from controller');
    return this.authsService.emtUserLogin(body.username);
  }
}
