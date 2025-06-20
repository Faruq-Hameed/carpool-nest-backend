import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { IsEmail } from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: 'change password is required' })
  @IsNotEmpty({ message: 'change password is required' })
  oldPassword: string;

  @IsString({ message: 'new password is required' })
  @IsNotEmpty({ message: 'new password is required' })
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString({ message: 'OTP is required' })
  @IsNotEmpty({ message: 'OTP is required' })
  otp: string;
}
