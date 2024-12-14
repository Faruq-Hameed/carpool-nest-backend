import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { Cloudinary } from './cloudinary';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [CloudinaryProvider,CloudinaryService, Cloudinary],
  exports: [CloudinaryProvider,CloudinaryService, Cloudinary],
})
export class CloudinaryModule {}
