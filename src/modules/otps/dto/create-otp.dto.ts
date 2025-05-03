import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PurposeEnum, OtpChannel } from '../entities/otp.entity';

export class CreateOtpDto {
  @IsString()
  phonenumber: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'purpose is required' })
  purpose: PurposeEnum;

  @IsNotEmpty({ message: 'channel is required' })
  channel: OtpChannel;
}
