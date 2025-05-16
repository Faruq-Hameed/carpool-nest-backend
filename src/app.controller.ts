import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
    @MessagePattern({ cmd: 'validate-user' })
    validateUser(data: any) {
      console.log('Received user data:', data);
      // pretend we checked a token or password
      return { isValid: true };
    }
}
