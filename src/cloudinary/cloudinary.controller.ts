import { Controller, Get, Post, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const uploadResponse =  await this.cloudinaryService.uploadFile(file);
    console.log({uploadResponse})
    return {
      message: uploadResponse.message,
      data: uploadResponse.metadata,
      url: uploadResponse.url
    }
  }
}
