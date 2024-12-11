import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'phonenumber is required'})
    @IsString()
    phonenumber: string;
  
    @IsNotEmpty({message: 'email is required'})
    @IsEmail()
    email: string;
  
    @IsNotEmpty({message: 'first is required'})
    @IsString()
    firstname: string;
  
    @IsNotEmpty({message: 'lastname is required'})
    @IsString()
    lastname: string;
  
    @IsNotEmpty({message: 'username is required'})
    @IsString()
    username: string;

    @IsNotEmpty({message: 'password is required'})
    @IsString()
    password: string;
  
  }
  
