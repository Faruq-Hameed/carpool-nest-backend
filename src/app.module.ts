import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CarsModule } from './modules/cars/cars.module';
import { RidesModule } from './rides/rides.module';

@Module({
  imports: [UsersModule, CarsModule, RidesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
