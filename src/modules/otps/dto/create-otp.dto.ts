import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { OtpPurpose, OtpChannel } from '../entities/otp.entity';
import { Optional } from '@nestjs/common';

export class CreateOtpDto {
  @IsString()
  @IsOptional()
  phonenumber: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty({ message: 'purpose is required' })
  purpose: OtpPurpose;

  @IsNotEmpty({ message: 'channel is required' })
  channel: OtpChannel;
}
