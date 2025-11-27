import { Module } from '@nestjs/common';
import { DepartmentController } from './app/department.controller';
import { DepartmentService } from './app/department.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SharedModule,
  RmqModule,
  SERVICES,
  Department,
  departmentSchema,
} from '@shared';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.DEPARTMENT]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
