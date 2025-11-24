import { Controller } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './../../../../libs/shared/src/DTO/employee.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class EmployeeController {
  constructor(private readonly empService: EmployeeService) {}

  @MessagePattern('employee.create')
  async createEmployee(body: CreateEmployeeDto) {
    return this.empService.createEmployee(body);
  }

  @MessagePattern('employee.get')
  async getAllEmployee() {
    return this.empService.getAllEmployee();
  }

  @MessagePattern('employee.delete')
  async deleteEmpById(id: string) {
    return this.empService.deleteEmpById(id);
  }

  @MessagePattern('employee.update')
  async updateEmpById(data: { id: string; body: CreateEmployeeDto }) {
    return this.empService.updateEmployee(data.id, data.body);
  }
}
