import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from '../entities/otp.entity';
import { OtpService } from './otps.service';
import { OtpsController } from './otps.controller';
// import { OtsController } from './otps.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Otp])],
  controllers: [
    OtpsController
  ],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
