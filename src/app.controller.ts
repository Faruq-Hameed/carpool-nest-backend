import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/guards/public.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('test-validate') //testing auth microservice
  // async testValidate() {
  //   console.log("request made to auth microservice");
  //   const result = await this.authClient.validateUser({ userId: 1, token: 'abc123' });
  //   console.log("request made to auth microservice RESPONDED");

  //   return result;
  // }
}
