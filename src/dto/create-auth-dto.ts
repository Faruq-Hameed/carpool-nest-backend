import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  phonenumber: string;

  @IsString()
  @IsNotEmpty()
  passcode: string;
}
