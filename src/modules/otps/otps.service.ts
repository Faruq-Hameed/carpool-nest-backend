// src/otp/otp.service.ts
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository, MoreThan, LessThan } from 'typeorm';
import { Otp } from './entities/otp.entity';
import { UserService } from '../users/users.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { verifyOtpDto } from './dto/verify-otp.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { IUser } from '../users/interfaces/users.interface';

// import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class OtpService {
  private readonly logger = new Logger("OTP CLEANUP SERVICE");

  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private userService: UserService,
    private readonly mailService: MailerService,
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
      otp: code,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
    await this.otpRepository.save(otp);
    console.log({ otp });

    if (isEmail) {
      await this.mailService.sendMail({
        to: user.email,
        subject: 'Your OTP Code',
        text: `kindly use this to ${generateOtp.purpose}`,
        // template: './otp', // assuming a mailer template named otp.hbs or similar
        context: {
          name: user.firstname || user.email,
          code,
        },
      });
      return `OTP sent to ${generateOtp.email}`;
    } else {
      // Placeholder for SMS logic
      return `otp sent to ${generateOtp.email}`; //.phone later
    }
  }

  async verifyOtp(validateOtp: verifyOtpDto):Promise<void> {
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
    if (!record) {
      throw new BadRequestException('Invalid or expired OTP');
    }
    // Delete the OTP record after successful validation
    await this.otpRepository.delete(record.id);
  }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleOtpCleanup() {
      const now = new Date();
      const result = await this.otpRepository.delete({ expiresAt: LessThan(now) });

      if (result.affected) {
        this.logger.log(`Deleted ${result.affected} expired OTP(s)`);
      }
    }
}
