import { SharedModule } from '@shared';
import { Module } from '@nestjs/common';
import { EmployeeController } from './app/employee.controller';
import { EmployeeService } from './app/employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RmqModule, SERVICES, Employee, employeeSchema } from '@shared';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.EMPLOYEE]),
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: employeeSchema,
      },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
