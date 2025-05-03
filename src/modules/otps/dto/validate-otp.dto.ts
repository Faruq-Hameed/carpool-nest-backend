import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PurposeEnum, OtpChannel } from '../entities/otp.entity';

export class validateOtpDto {
  @IsString()
  phonenumber: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'purpose is required' })
  purpose: PurposeEnum;

  @IsString({ message: 'otp is required' })
  otp: string;
}
