import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getData() {
    return this.employeeService.getData();
  }
}
