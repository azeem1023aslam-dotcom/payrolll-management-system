/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URI],
        // queue: process.env[`RMQ_${SERVICES.AUTH}_QUEUE`],
        // queue: process.env.RMQ_AUTH_QUEUE,
        queue: 'AUTH',
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
