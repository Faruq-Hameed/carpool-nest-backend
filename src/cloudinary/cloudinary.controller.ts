import { Controller, Get, Post, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/guards/public.guard';

@Controller('images')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log("file to upload is : ",{file});
    const uploadResponse =  await this.cloudinaryService.uploadFile(file);
    console.log({uploadResponse})
    return {
      message: uploadResponse.message,
      data: uploadResponse.metadata,
      url: uploadResponse.url
    }
  }
}
