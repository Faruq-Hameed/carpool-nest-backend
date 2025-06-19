import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';

import { LoginUserDto, OtpLoginDto } from './dto/login-auth.dto';
import { UserService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { IAuthResponse, IAuthReturn } from './interfaces/response';
import { CreateOtpDto } from '../otps/dto/create-otp.dto';
import { OtpService } from '../otps/otps.service';
import { OtpChannel, OtpPurpose } from '../otps/entities/otp.entity';
// import { ChangePasswordDto } from './dto/';
import { verifyOtpDto } from '../otps/dto/verify-otp.dto';
import { Status } from 'src/shared/enums/status.enum';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Injectable()
export class AuthsService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private otpService: OtpService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<string> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    const otpMessage = await this.otpService.generateOtp({
      purpose: OtpPurpose.VERIFY_EMAIL,
      channel: OtpChannel.EMAIL,
      email: createUserDto.email,
      phonenumber: null,
    });
    return otpMessage;

    //send welcome email to user,
    // let him know next step too i.e basic kyc
  }

  /** service to generate token during account creation */
  async verifyEmail(verifyOtpDto: verifyOtpDto): Promise<IAuthReturn> {
    const { email, otp } = verifyOtpDto; //THIS SHOULD BE EMAIL OR PHONE
    const user = await this.userService.findUserByField(
      { email },
      [
        'id',
        'firstname',
        'lastname',
        'email',
        'phonenumber',
        'profilePicture',
        'isAdmin',
        'emailStatus',
      ],
      true, //throw error if not found
    );
    if (user.emailStatus === Status.VERIFIED) {
      throw new BadRequestException('Email already verified');
    }
    //validate otp
    await this.otpService.verifyOtp({
      email,
      otp,
      phonenumber: null,
      purpose: OtpPurpose.VERIFY_EMAIL,
    });
    const token = await this.generateToken(user);
    return {
      token,
      user,
    };
  }

  /** service to verify phone number */
  async verifyPhone(verifyOtpDto: verifyOtpDto): Promise<void> {
    const { phonenumber, otp } = verifyOtpDto; //THIS SHOULD BE phonenumber OR PHONE
    const user = await this.userService.findUserByField(
      { phonenumber },
      [
        'id',
        'firstname',
        'lastname',
        'email',
        'phonenumber',
        'profilePicture',
        'isAdmin',
        'phoneStatus',
      ],
      true, //throw error if not found
    );
    if (user.phoneStatus === Status.VERIFIED) {
      throw new BadRequestException('Phone number already verified');
    }
    //validate otp
    await this.otpService.verifyOtp({
      phonenumber,
      otp,
      email: null,
      purpose: OtpPurpose.VERIFY_PHONE,
    });
  }

  async otpLogin(otpLoginDto: OtpLoginDto): Promise<IAuthReturn> {
    const { email, otp } = otpLoginDto; //THIS SHOULD BE EMAIL OR PHONE
    const user = await this.userService.findUserByField(
      { email },
      [
        'id',
        'firstname',
        'lastname',
        'email',
        'phonenumber',
        'profilePicture',
        'isAdmin',
      ],
      true, //throw error if not found
    );
    //validate otp
    await this.otpService.verifyOtp({
      email,
      otp,
      phonenumber: null,
      purpose: OtpPurpose.VERIFY_EMAIL,
    });
    const token = await this.generateToken(user);
    return {
      token,
      user,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<IAuthResponse> {
    const { email, password } = loginUserDto;
    const user = await this.userService.findUserByField(
      { email },
      [
        'id',
        'firstname',
        'lastname',
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
      throw new BadRequestException('Invalid credentials');
    }
    delete user.password;

    let token: string | null = null;
    //check if email is not verified and create otp if not verified
    if (user.emailStatus !== Status.VERIFIED) {
      const otpMessage = await this.otpService.generateOtp({
        purpose: OtpPurpose.VERIFY_EMAIL,
        channel: OtpChannel.EMAIL,
        email: user.email,
        phonenumber: null,
      });

      return {
        message: otpMessage,
        data: {
          token, //no token generated, user should verify email first
          user,
        },
      };
    }
    token = await this.generateToken(user);
    //LOGIN RECORD SHOULD BE STORED LATER
    return {
      message: 'User login successfully',
      data: {
        token,
        user,
      },
    };
  }

  /**service to password */
  async resetPassword(ResetPasswordDto: ResetPasswordDto): Promise<void> {
    const { email, password, otp } = ResetPasswordDto;
    const user = await this.userService.findUserByField(
      { email },
      ['id', 'firstname', 'lastname', 'email', 'phonenumber', 'password'],
      true,
    );
    //validate otp
    await this.otpService.verifyOtp({
      email,
      otp,
      phonenumber: null,
      purpose: OtpPurpose.RESET_PASSWORD,
    });
    user.password = await bcrypt.hash(password, 10);
    await this.userService.updateUser(user.id, user);
  }

  /**service to Change password */ //NOT COPLETED
  async changePassword(changePasswordDto: ChangePasswordDto): Promise<void> {
    const { email, password, otp } = changePasswordDto;
    const user = await this.userService.findUserByField(
      { email },
      ['id', 'firstname', 'lastname', 'email', 'phonenumber', 'password'],
      true,
    );
    //validate otp
    await this.otpService.verifyOtp({
      email,
      otp,
      phonenumber: null,
      purpose: OtpPurpose.RESET_PASSWORD,
    });
    user.password = await bcrypt.hash(password, 10);
    await this.userService.updateUser(user.id, user);
  }

  /**Service to generate jwt token */
  async generateToken(user: User): Promise<string> {
    return this.jwtService.signAsync({
      userId: user.id,
      isAdmin: user.isAdmin,
    });
  }

  async checkUser(data: any) {
    return this.authClient.send({ cmd: 'validate-user' }, data);
  }

  async emtUserLogin(username: string) {
    //assuming we've validated the user and login

    this.userClient.emit('user_logged_in', { username });
    //proceed with something else

    return { message: 'Event emitted from monolith' };
  }
}
