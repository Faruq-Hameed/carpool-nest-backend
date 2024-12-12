import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CarsModule } from './modules/cars/cars.module';
import { RidesModule } from './modules/rides/rides.module';

import databaseConfig from './config/database.config';
import { validate } from './config/env.validation';
import { AuthsModule } from './modules/auths/auths.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    UsersModule, CarsModule, RidesModule, AuthsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
