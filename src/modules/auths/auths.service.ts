import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, OtpLoginDto } from './dto/login-auth.dto';
import { UserService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { IAuthResponse, IAuthReturn } from './interfaces/response';
import { CreateOtpDto } from '../otps/dto/create-otp.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { OtpService } from '../otps/otps.service';
import { OtpChannel, PurposeEnum } from '../otps/entities/otp.entity';
import { ChangePasswordDto } from './dto/change-password-dto';

@Injectable()
export class AuthsService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<string> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    await this.userService.createUser(createUserDto);
    const otpMessage = await this.otpService.generateOtp({
      purpose: PurposeEnum.VERIFY_EMAIL,
      channel: OtpChannel.EMAIL,
      email: createUserDto.email,
      phonenumber: null,
    });
    return otpMessage;

    //send welcome email to user,
    // let him know next step too i.e basic kyc
  }

  async otpLogin(otpLoginDto: OtpLoginDto): Promise<IAuthReturn> {
    const { email, otp } = otpLoginDto; //THIS SHOULD BE EMAIL OR PHONE
    const user = await this.userService.findUserByField(
      { email },
      [
        'id',
        'firstname',
        'lastname',
        'username',
        'email',
        'phonenumber',
        'profilePicture',
      ],
      true, //throw error if not found
    );
    //validate otp
    await this.otpService.validateOtp({
      email,
      otp,
      phonenumber: null,
      purpose: PurposeEnum.VERIFY_EMAIL,
    });
    return {
      token: await this.jwtService.signAsync({
        userId: user.id,
        username: user.username,
      }),
      user,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<IAuthReturn> {
    const { email, password } = loginUserDto;
    const user = await this.userService.findUserByField(
      { email },
      [
        'id',
        'firstname',
        'lastname',
        'username',
        'email',
        'phonenumber',
        'profilePicture',
        'password',
        'createdAt',
        'updatedAt',
      ],
      true,
    );
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // const {profilePicture} = user
    // user.profilePicture = user.profilePicture?
    delete user.password;
    //login record should be stored later
    return {
      token: await this.jwtService.signAsync({
        userId: user.id,
        username: user.username,
      }),
      user,
    };
  }

  /**service to password */
  async resetPassword(changePasswordDto: ChangePasswordDto): Promise<void> {
    const { email, password, otp } = changePasswordDto;
    const user = await this.userService.findUserByField(
      { email },
      [
        'id',
        'firstname',
        'lastname',
        'username',
        'email',
        'phonenumber',
        'password',
      ],
      true,
    );
    //validate otp
    await this.otpService.validateOtp({
      email,
      otp,
      phonenumber: null,
      purpose: PurposeEnum.RESET_PASSWORD,
    });
    user.password = await bcrypt.hash(password, 10);
    await this.userService.updateUser(user.id, user);
  }
}
