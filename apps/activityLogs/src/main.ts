import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SERVICES } from '../../../libs/shared/src/index';
import { ActivityLogsModule } from './activityLogs.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ActivityLogsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URI],
        queue: SERVICES.ACTIVITY_LOGS,
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
