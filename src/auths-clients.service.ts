// auth-client.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
/** This service is responsible for communicating with the Auth microservice */
export class AuthClientService implements OnModuleInit {
  private client: ClientProxy;

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'auth_queue',
        queueOptions: { durable: false },
      },
    });
  }

  async validateUser(userData: any) {
    console.log("request made to auth INSIDE microservice");

    return await this.client.send({ cmd: 'validate-user' }, userData).toPromise();
  }
}
