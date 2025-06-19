import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthsService } from './auths.service';
import { LoginUserDto, OtpLoginDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { IAuthResponse, IGeneralResponse } from './interfaces/response';
import { Public } from 'src/common/guards/public.guard';
import { CreateOtpDto } from '../otps/dto/create-otp.dto';
import { ChangePasswordDto } from './dto/change-password-dto';
import { AuthResponseDto } from './dto/auth-response-dto';
import { verifyOtpDto } from '../otps/dto/verify-otp.dto';
import { OtpService } from '../otps/otps.service';

@ApiTags('auth')
@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private readonly otpService: OtpService, // Inject OtpService to generate OTPs
  ) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto }) //type of the request body
  @ApiCreatedResponse({ description: 'User created', type: AuthResponseDto }) //NOT YET TESTED
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IGeneralResponse> {
    const message = await this.authsService.register(createUserDto);
    return {
      message,
      data: null,
    };
  }

  @Public()
  @Post('verify/email')
  @ApiOperation({ summary: 'Verify email during account creation' })
  @ApiBody({ type: verifyOtpDto }) //type of the request body
  @ApiCreatedResponse({
    description: 'Verify email successfully',
    type: AuthResponseDto,
  }) //NOT YET TESTED
  async verifyEmail(
    @Body() verifyOtpDto: verifyOtpDto,
  ): Promise<IGeneralResponse> {
    const data = await this.authsService.verifyEmail(verifyOtpDto);
    return {
      message: 'Email verified successfully. Token generated.',
      data,
    };
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<IAuthResponse> {
    return await this.authsService.login(loginUserDto);
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

  @Public()
  @Get('check-user')
  async checkUser(@Body() data: any): Promise<any> {
    console.log('request made to auth microservice from controller');
    return await this.authsService.checkUser({ username: 'john' });
  }
  @Public()
  @Post('emit-login')
  async emitLogin(@Body() body: { username: string }) {
    console.log('Emitted from controller');
    return this.authsService.emtUserLogin(body.username);
  }
}
