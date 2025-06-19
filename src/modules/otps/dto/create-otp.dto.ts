import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { OtpPurpose, OtpChannel } from '../entities/otp.entity';
import { Optional } from '@nestjs/common';

export class CreateOtpDto {
  @IsString()
  @Optional()
  phonenumber: string;

  @IsEmail()
  @Optional()
  email: string;

  @IsNotEmpty({ message: 'purpose is required' })
  purpose: OtpPurpose;

  @IsNotEmpty({ message: 'channel is required' })
  channel: OtpChannel;
}
