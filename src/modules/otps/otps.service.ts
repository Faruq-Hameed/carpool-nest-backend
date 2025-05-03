// src/otp/otp.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Otp } from './entities/otp.entity';
import { UserService } from '../users/users.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { validateOtpDto } from './dto/validate-otp.dto';

@Injectable()
export class OtpService {
  otpService: any;
  mailService: any;
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private userService: UserService,
  ) {}

  async generateOtp(generateOtp: CreateOtpDto): Promise<string> {
    const isEmail = !!generateOtp.email;
    const findBy = isEmail
      ? { email: generateOtp.email }
      : { phonenumber: generateOtp.phonenumber };
    const user = await this.userService.findUserByField(
      findBy,
      ['email', 'phonenumber', 'id', 'firstname'],
      true,
    );
    //now generate otp and send to the user
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const otp = this.otpRepository.create({
      ...generateOtp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    if (isEmail) {
      await this.mailService.sendMail({
        to: user.email,
        subject: 'Your OTP Code',
        text: `kindly use this to ${generateOtp.purpose}`,
        // template: './otp', // assuming a mailer template named otp.hbs or similar
        context: {
          name: user.firstname || user.email,
          otp,
        },
      });
      return `otp sent to ${generateOtp.email}`;
    } else {
      // Placeholder for SMS logic
      return `otp sent to ${generateOtp.email}`; //.phone later
    }
  }

  async validateOtp(validateOtp: validateOtpDto) {
    const { otp, purpose } = validateOtp;
    const isEmail = !!validateOtp.email;
    const field = isEmail
      ? { email: validateOtp.email }
      : { phonenumber: validateOtp.phonenumber };
    const record = await this.otpRepository.findOne({
      where: {
        ...field,
        otp,
        purpose,
        expiresAt: MoreThan(new Date()),
      },
    });
    return !!record;
  }
}
