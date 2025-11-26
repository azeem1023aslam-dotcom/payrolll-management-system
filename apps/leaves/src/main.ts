import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { LeavesModule } from './leaves.module';
import { Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(LeavesModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URI],
        queue: SERVICES.LEAVES,
        queueOptions: {
          durable: true
        },
      },
    }
  );
  await app.listen();
  Logger.log(`🚀 Application is running`);
}

bootstrap();
