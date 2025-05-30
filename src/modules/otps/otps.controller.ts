import {
  Controller,
  Post,
  Body,

} from '@nestjs/common';
import { Public } from 'src/common/guards/public.guard';
import { CreateOtpDto } from './dto/create-otp.dto';
import { OtpService } from './otps.service';
import { IAuthResponse } from '../auths/interfaces/response';

@Controller('otps')
export class OtsController {
  constructor(private readonly otpService: OtpService) {}

  @Public()
  @Post()
  async create(
    @Body() createOtpDto: CreateOtpDto,
  ): Promise<Partial<IAuthResponse>> {
    const message = await this.otpService.generateOtp(createOtpDto);
    return {
      message,
    };
  }
}
