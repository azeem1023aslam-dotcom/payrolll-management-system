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
    const isEmployee = await this.empModal.findById(id);
    if (!isEmployee) {
      throw new RpcException({
        status: 404,
        message: 'Employee Id is not valid id!',
      });
    }

    if (body.email && body.email !== isEmployee.email) {
      const emailExists = await this.empModal.findOne({ email: body.email });
      if (emailExists) {
        throw new RpcException({
          status: 404,
          message: 'Email already exists!',
        });
      }
    }

    const editData = await this.empModal.findByIdAndUpdate(id, body, {
      new: true,
    });
    return {
      status: 200,
      message: 'Employee updated successfully!',
      data: editData,
    };
  }

  async deleteEmpById(id: string) {
    const emp = await this.empModal.findByIdAndDelete(id);
    return {
      message: 'Employee deleted successfully',
      data: emp,
    };
  }
}
