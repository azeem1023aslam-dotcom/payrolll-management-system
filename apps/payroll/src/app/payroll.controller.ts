import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PayrollService } from './payroll.service';
@Controller()
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @MessagePattern('leaves.create')
  async createPayroll(data: any) {
    const { userId, ...body } = data;
    return this.payrollService.createPayroll(body, userId);
  }

  @MessagePattern('payroll.getAll')
  async getAllPayroll() {
    return this.payrollService.getAllPayroll();
  }

}