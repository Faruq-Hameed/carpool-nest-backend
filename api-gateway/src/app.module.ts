import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CarsModule } from './modules/cars/cars.module';
import { RidesModule } from './modules/rides/rides.module';

import databaseConfig from './config/database.config';
import { validate } from './config/env.validation';
import { AuthsModule } from './modules/auths/auths.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { OtpModule } from './modules/otps/otps.module';
import { AuthClientService } from './auths-clients.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      validate,
    }),
    // TypeOrmModule.forRootAsync({ //ORIGINAL
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) =>
    //     configService.get('database'),
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forRoot({ //FOR DOCKER
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, //  good for dev only!
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),

    UsersModule,
    CarsModule,
    RidesModule,
    AuthsModule,
    CloudinaryModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService, 
    // AuthClientService
  ],
})
export class AppModule {}
