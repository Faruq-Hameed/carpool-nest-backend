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
import { LoginUserDto, OtpLoginDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { IAuthResponse } from './interfaces/response';
import { Public } from 'src/common/guards/public.guard';
import { CreateOtpDto } from '../otps/dto/create-otp.dto';
import { ChangePasswordDto } from './dto/change-password-dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IAuthResponse> {
    const message = await this.authsService.register(createUserDto);
    return {
      message,
      data: null,
    };
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<IAuthResponse> {
    const response = await this.authsService.login(loginUserDto);
    return {
      message: 'User login successfully',
      data: {
        ...response,
      },
    };
  }

  @Public()
  @Post('forget-password')
  async forgetPassword(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<IAuthResponse> {
     await this.authsService.resetPassword(changePasswordDto);
    return {
      message: 'Password reset successfully', //the user should login again
      data: null,
    };
  }
    @Public()
  @Post('otp-login')
  async otpLogin(@Body() otpLoginDto: OtpLoginDto): Promise<IAuthResponse> {
    const response = await this.authsService.otpLogin(otpLoginDto);
    return {
      message: 'Otp verified, user login successfully',
      data: {
        ...response,
      },
    };
  }
  
}
