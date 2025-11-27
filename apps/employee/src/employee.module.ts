import { SharedModule } from '@shared';
import { Module } from '@nestjs/common';
import { EmployeeController } from './app/employee.controller';
import { EmployeeService } from './app/employee.service';
import { RmqModule, SERVICES } from '@shared';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.EMPLOYEE]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
