import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Import the User entity here
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
