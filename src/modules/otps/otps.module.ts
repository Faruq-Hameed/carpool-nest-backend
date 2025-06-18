import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { OtpService } from './otps.service';
import { UsersModule } from '../users/users.module';
import { OtpController } from './otps.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Otp]), UsersModule],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
