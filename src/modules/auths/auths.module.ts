import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UserService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
@Module({
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn:'30m' },
    }),
  ],
  controllers: [AuthsController],
  providers: [AuthsService,
    //global auth guard
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthsModule {}
