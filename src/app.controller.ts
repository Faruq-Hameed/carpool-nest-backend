import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post('upload')
  upload(){
    
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
