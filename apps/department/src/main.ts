import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DepartmentModule } from './department.module';
import { Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(DepartmentModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URI],
        queue: SERVICES.DEPARTMENT,
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
