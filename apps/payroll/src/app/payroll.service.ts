import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payroll } from '@shared';

@Injectable()
export class PayrollService {
  constructor(
    @InjectModel(Payroll.name) private payrollModal: Model<Payroll>,
  ) {}

  async createPayroll(body: any, userId: string) {
   
  }

  async getAllPayroll() {
    
}
}