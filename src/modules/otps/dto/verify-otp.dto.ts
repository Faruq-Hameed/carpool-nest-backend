import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PurposeEnum, OtpChannel } from '../entities/otp.entity';
import { Optional } from '@nestjs/common';

export class verifyOtpDto {
  @IsString()
  @Optional()
  phonenumber: string;

  @Optional()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'purpose is required' })
  purpose: PurposeEnum;

  @IsString({ message: 'otp is required' })
  otp: string;
}
