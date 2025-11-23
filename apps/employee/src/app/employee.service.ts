import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './../../../../libs/shared/src/schema/employee.schema';
import { CreateEmployeeDto } from './../../../../libs/shared/src/DTO/employee.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class EmployeeService {
  constructor(@InjectModel(Employee.name) private empModal: Model<Employee>) {}

  async createEmployee(body: CreateEmployeeDto) {
    const isExist = await this.empModal.findOne({ email: body.email });
    if (isExist) {
      throw new RpcException({
        status: 404,
        message: 'Email already registered!',
      });
    }

    const newEmployee = await this.empModal.create(body);
    return {
      staus: 202,
      message: 'Employee create successfully',
      data: newEmployee,
    };
  }

  async getAllEmployee() {
    return this.empModal.find();
  }

  async updateEmployee(id: string, body: CreateEmployeeDto) {
    const isEmployee = await this.empModal.findOne({ _id: id });
    if (!isEmployee) {
      throw new RpcException({
        status: 404,
        message: 'Employee Id is not valid id!',
      });
    }

    const editData = await this.empModal.findByIdAndUpdate({
      _id: id,
      body,
      new: true,
    });
    return {
      message: 'Employee updated successfully!',
      data: editData,
    };
  }

  async deleteEmpById(id: string) {
    const emp = await this.empModal.findByIdAndDelete({ _id: id });
    return {
      message: 'Employee deleted successfully',
      data: emp,
    };
  }
}
