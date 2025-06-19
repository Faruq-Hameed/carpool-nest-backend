import { IsNotEmpty, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';
import { IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @IsString({ message: 'new password is required' })
  @IsNotEmpty({ message: 'new password is required' })
  password: string;

  @Optional()
  @IsEmail()
  email: string;

  @IsString({ message: 'OTP is required' })
  @IsNotEmpty({ message: 'OTP is required' })
  otp: string;
}
