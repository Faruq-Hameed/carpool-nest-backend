import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto{

    @IsEmail({}, { message: "Please enter valid email" })
    email: string;

    @IsNotEmpty({message: 'password is required'})
    password: string;
}
