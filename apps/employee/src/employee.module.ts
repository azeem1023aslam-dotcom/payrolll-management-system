import { Module } from '@nestjs/common';
import { EmployeeService } from './app/employee.service';
import { EmployeeController } from './app/employee.controller';

@Module({
  imports: [],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
