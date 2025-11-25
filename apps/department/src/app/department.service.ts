import { Department, CreateDepartmentDto } from '@shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private depModal: Model<Department>
  ) {}

  async createDepartment(body: CreateDepartmentDto) {
    const isExist = await this.depModal.findOne({ name: body.name });
    if (isExist) {
      throw new RpcException({
        status: 404,
        message: 'Department already registered!',
      });
    }

    const newDepartment = await this.depModal.create(body);
    return {
      staus: 202,
      message: 'Department create successfully',
      data: newDepartment,
    };
  }

  async getAllEmployee() {
    return this.depModal.find();
  }

  async updateDepartment(id: string, body: CreateDepartmentDto) {
    const isDepartment = await this.depModal.findById(id);
    if (!isDepartment) {
      throw new RpcException({
        status: 404,
        message: 'Department Id is not valid id!',
      });
    }

    if (body.name && body.name !== isDepartment.name) {
      const nameExists = await this.depModal.findOne({ name: body.name });
      if (nameExists) {
        throw new RpcException({
          status: 404,
          message: 'Department name already exists!',
        });
      }
    }

    const editData = await this.depModal.findByIdAndUpdate(id, body, {
      new: true,
    });
    return {
      status: 200,
      message: 'Department updated successfully!',
      data: editData,
    };
  }

  async deleteEmpById(id: string) {
    const dep = await this.depModal.findByIdAndDelete(id);
    return {
      message: 'Department deleted successfully',
      data: dep,
    };
  }
}
