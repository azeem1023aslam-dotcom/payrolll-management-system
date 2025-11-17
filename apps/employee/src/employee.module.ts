import { Module } from '@nestjs/common';
import { EmployeeController } from './app/employee.controller';
import { EmployeeService } from './app/employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RmqModule } from '../../../libs/shared/src/lib/rmq.module';
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
    RmqModule.registerMultipleAsync([SERVICES.EMPLOYEE]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
