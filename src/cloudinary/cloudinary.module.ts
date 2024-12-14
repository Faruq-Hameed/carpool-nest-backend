import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryController } from './cloudinary.controller';

@Module({
  providers: [CloudinaryProvider,CloudinaryService,],
  controllers: [CloudinaryController],
  exports: [CloudinaryProvider,CloudinaryService,],
})
export class CloudinaryModule {}


// // cloudinary.module.ts
// import { Module } from '@nestjs/common';
// import { MulterModule } from '@nestjs/platform-express';
// import { CloudinaryService } from './cloudinary.service';
// import { CloudinaryProvider } from './cloudinary.provider';
// import { CloudinaryController } from './cloudinary.controller';

// @Module({
//   imports: [
//     MulterModule.register({
//       limits: {
//         fileSize: 10 * 1024 * 1024, // 10MB max file size
//       },
//     }),
//   ],
//   providers: [CloudinaryProvider, CloudinaryService],
//   controllers: [CloudinaryController],
//   exports: [CloudinaryProvider, CloudinaryService],
// })
// export class CloudinaryModule {}
