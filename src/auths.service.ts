import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateUserDto } from 'src/shared/dto/create-user.dto';
import { OtpService } from './otps/otps.service';
import { OtpChannel, PurposeEnum } from './entities/otp.entity';
import { CreateAuthDto } from './dto/create-auth-dto';

import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IServiceResponse } from 'src/shared/interfaces/serviceResponse';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    
    private otpService: OtpService,

  ) {}
  /** private service to create auth row */
  private async createUserAuth(
    createAuthDto: CreateAuthDto,
  ): Promise<IServiceResponse> {
    const { phonenumber } = createAuthDto;
    //check if phonenumber already exist
    const doesPhonenumberExists = await this.getAuthByPhone(phonenumber);
    if (doesPhonenumberExists) {
      return {
        success: false,
        message: 'Phone number already exists',
        data: {},
      };
    }
    //PASSCODE SHOULD BE HASHED HERE

    const auth = this.authRepository.create(createAuthDto);
    await this.authRepository.save(auth);
    return {
      success: true,
      message: '',
      data: { authId: auth.id }, //this is needed in the user table,
    };
  }

  private async getAuthByPhone(phonenumber: string) {
    return await this.authRepository.findOne({
      where: { phonenumber },
      select: ['phonenumber'],
    });
  }
  async register(createUserDto: CreateUserDto): Promise<IServiceResponse> {
    const createAuthResponse = await this.createUserAuth({
      phonenumber: createUserDto.phonenumber,
      passcode: createUserDto.passcode,
    });
    if (!createAuthResponse.success) {
      return createAuthResponse;
    }
    this.userClient.emit('create-user', createUserDto); //publish create user no need to wait for error

    //THIS SHOULD BE PHONE LATER
    const message = await this.otpService.generateOtp({
      //THIS WILL CALL NOTIFICATION SERVICE
      purpose: PurposeEnum.VERIFY_EMAIL,
      email: createUserDto.email,
      channel: OtpChannel.EMAIL,
      phonenumber: '',
    });
    return {
      success: true,
      message,
      data: {},
    };
  }

  // async otpLogin(otpLoginDto: OtpLoginDto): Promise<IAuthReturn> {
  //   const { email, otp } = otpLoginDto; //THIS SHOULD BE EMAIL OR PHONE
  //   const user = await this.userService.findUserByField(
  //     { email },
  //     ['id', 'firstname', 'lastname', 'email', 'phonenumber', 'profilePicture'],
  //     true, //throw error if not found
  //   );
  //   //validate otp
  //   await this.otpService.validateOtp({
  //     email,
  //     otp,
  //     phonenumber: null,
  //     purpose: PurposeEnum.VERIFY_EMAIL,
  //   });
  //   return {
  //     token: await this.jwtService.signAsync({
  //       userId: user.id,
  //     }),
  //     user,
  //   };
  // }

  // async login(loginUserDto: LoginUserDto): Promise<IAuthReturn> {
  //   const { email, password } = loginUserDto;
  //   const user = await this.userService.findUserByField(
  //     { email },
  //     [
  //       'id',
  //       'firstname',
  //       'lastname',
  //       'email',
  //       'phonenumber',
  //       'profilePicture',
  //       'password',
  //       'createdAt',
  //       'updatedAt',
  //     ],
  //     true,
  //   );
  //   const isPasswordCorrect = await bcrypt.compare(password, user.password);
  //   if (!isPasswordCorrect) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //   // const {profilePicture} = user
  //   // user.profilePicture = user.profilePicture?
  //   delete user.password;
  //   //login record should be stored later
  //   return {
  //     token: await this.jwtService.signAsync({
  //       userId: user.id,
  //     }),
  //     user,
  //   };
  // }

  /**service to password */
  // async resetPassword(changePasswordDto: ChangePasswordDto): Promise<void> {
  //   const { email, password, otp } = changePasswordDto;
  //   const user = await this.userService.findUserByField(
  //     { email },
  //     ['id', 'firstname', 'lastname', 'email', 'phonenumber', 'password'],
  //     true,
  //   );
  //   //validate otp
  //   await this.otpService.validateOtp({
  //     email,
  //     otp,
  //     phonenumber: null,
  //     purpose: PurposeEnum.RESET_PASSWORD,
  //   });
  //   user.password = await bcrypt.hash(password, 10);
  //   await this.userService.updateUser(user.id, user);
  // }

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
