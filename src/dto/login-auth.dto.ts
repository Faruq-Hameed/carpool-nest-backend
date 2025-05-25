import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto{

    @IsString({ message: 'phonenumber is required' })
    phonenumber: string;

    @IsNotEmpty({message: 'passcode is required'})
    passcode: string;
}

export class OtpLoginDto{
    @IsString({ message: 'otp is required' })
    @IsNotEmpty({ message: 'otp is required' })
    otp: string;

    @IsEmail({}, { message: "Please enter valid email" })
    email: string;
}