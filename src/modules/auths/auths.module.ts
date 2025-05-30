import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UserService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { OtpModule } from '../otps/otps.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [UsersModule,OtpModule,
    // MailerModule.forRoot({
    //   transport: {
    //     host: process.env.EMAIL_HOST,
    //     auth: {
    //       user: process.env.EMAIL_USERNAME,
    //       pass: process.env.EMAIL_PASSWORD,
    //     },
    //   },
    // }),
    JwtModule.register({
      global: true, //global: true makes JWT services available across the entire application 
      // without needing to import JwtModule in every module.
      secret: jwtConstants.secret,
      signOptions: { expiresIn:'30m' },
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
    ]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options:{
           urls: ['amqp://localhost:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: false,
          },
        }
      }
    ])
  ],
  controllers: [AuthsController],
  providers: [AuthsService,
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
