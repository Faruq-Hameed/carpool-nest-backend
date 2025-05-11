import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto{

    @IsEmail({}, { message: "Please enter valid email" })
    email: string;

    @IsNotEmpty({message: 'password is required'})
    password: string;
}

export class OtpLoginDto{
    @IsString({ message: 'otp is required' })
    @IsNotEmpty({ message: 'otp is required' })
    otp: string;

    @IsEmail({}, { message: "Please enter valid email" })
    email: string;
}