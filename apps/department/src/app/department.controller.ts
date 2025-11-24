import { CreateDepartmentDto } from './../../../../libs/shared/src/DTO/department.dto';
import { Controller } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class DepartmentController {
  constructor(private readonly depService: DepartmentService) {}

  @MessagePattern('department.create')
  async createDepartment(body: CreateDepartmentDto) {
    return this.depService.createDepartment(body);
  }

  @MessagePattern('department.get')
  async getAllEmployee() {
    return this.depService.getAllEmployee();
  }

  @MessagePattern('department.delete')
  async deleteEmpById(id: string) {
    return this.depService.deleteEmpById(id);
  }

  @MessagePattern('department.update')
  async updateDepById(data: { id: string; body: CreateDepartmentDto }) {
    return this.depService.updateDepartment(data.id, data.body);
  }
}
