import { Module, DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class RmqModule {
  static registerAsync(queue: string): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ConfigModule, // ensure env available

        ClientsModule.registerAsync([
          {
            name: queue,
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [config.get<string>('RMQ_URI')],
                queue,
                queueOptions: { durable: true },
              },
            }),
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}