import { SharedModule } from '@shared';
import { Module } from '@nestjs/common';
import { DepartmentController } from './app/department.controller';
import { DepartmentService } from './app/department.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RmqModule } from '../../../libs/shared/src/lib/rmq.module';
import { SERVICES } from '@shared';
import { Department, departmentSchema } from 'libs/shared/src/schema/department.schema';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.DEPARTMENT]),
    MongooseModule.forFeature([
      {
        name: Department.name,
        schema: departmentSchema,
      },
    ]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
