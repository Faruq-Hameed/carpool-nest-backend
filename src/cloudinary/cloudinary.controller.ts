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
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }
}
