import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { AuthClientService } from './auths-clients.service';
import { Public } from './common/guards/public.guard';

  @Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly authClient: AuthClientService
  ) {}

  @Post('upload')
  upload(){
    
  }
  

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-validate') //testing auth microservice
  async testValidate() {
    console.log("request made to auth microservice");
    const result = await this.authClient.validateUser({ userId: 1, token: 'abc123' });
    console.log("request made to auth microservice RESPONDED");

    return result;
  }
}
