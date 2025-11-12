import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        dbName: configService.get('MONGO_DATABASE'),
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync(
      Object.values(SERVICES)?.map((service) => ({
        name: service,
        inject: [ConfigService],
        useFactory: (configService:ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: configService.get('RMQ_URI'),
            queue: configService.get(`RMQ_${service}_QUEUE`),
            prefetchCount: 1,
            queueOptions: {
              durable: false,
            },
          },
        }),
      }))
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
