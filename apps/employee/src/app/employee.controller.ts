import { Controller } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @MessagePattern('employee.create')
  async createEmployee() {
    return 'comment';
  }
}
