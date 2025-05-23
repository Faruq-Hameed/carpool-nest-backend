import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor (
    // @Inject('USER_SERVICE') private readonly userClient: ClientProxy
  ){}
  getHello(): string {
    return 'Hello World!';
  }
  
  @MessagePattern({ cmd: 'validate-user' })
    validateUser(data: any) {
      console.log('Received user data:', data);
      // pretend we checked a token or password
      return { isValid: true };
    }

}
