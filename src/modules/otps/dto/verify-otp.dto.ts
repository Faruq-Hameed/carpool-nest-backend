import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OtpPurpose, OtpChannel } from '../entities/otp.entity';
// import { IsOptional } from '@nestjs/common';

export class verifyOtpDto {
  @IsString()
  @IsOptional()
  phonenumber: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'purpose is required' })
  purpose: OtpPurpose;

  @IsString({ message: 'otp is required' })
  otp: string;
}
