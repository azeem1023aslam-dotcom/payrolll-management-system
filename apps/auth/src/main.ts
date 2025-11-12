/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URI],
        queue: process.env[`RMQ_${SERVICES.AUTH}_QUEUE`],
        queueOptions: {
          durable: false
        },
      },
    }
  );
  await app.listen();
  Logger.log(`🚀 Application is running`);
}

bootstrap();
