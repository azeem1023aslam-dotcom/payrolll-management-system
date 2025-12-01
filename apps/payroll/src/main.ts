import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared';
import { PayrollModule } from './payroll.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PayrollModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URI],
        queue: SERVICES.PAYROLL,
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
