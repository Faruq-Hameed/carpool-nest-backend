import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the carpool apis';
  }

}
