import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Otp } from './entities/otp.entity';
import { OtpService } from './otps/otps.service';
import { OtpModule } from './otps/otps.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    OtpModule,
    JwtModule.register({
      global: true, //global: true makes JWT services available across the entire application
      // without needing to import JwtModule in every module.
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AuthsController],
  providers: [
    AuthsService,
    OtpService,
    //global auth guard
    {
      provide: APP_GUARD, //Registers a global guard (AuthGuard) for the entire application
      // A custom guard for protecting routes, typically checking for a valid JWT in the request.
      useClass: AuthGuard, //useClass: Tells NestJS to use AuthGuard as the implementation for APP_GUARD
      //makes it a default guard for all routes unless overridden by route-specific guards e.g with @IsPublic decor
    },
  ],
})
export class AuthsModule {}
