import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ, // using RabbitMQ as the transport method
    options: {
      urls: ['amqp://localhost:5672'], // RabbitMQ server URL. The protocol is amqp:// 
      queue: 'auth_queue', //All messages for this service go to this queue
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  await app.init().then( ()=>{
    console.log('Auth microservice initialized');
  }); // Initialize the microservice
  console.log('Auth microservice is listening...');
}
bootstrap();
