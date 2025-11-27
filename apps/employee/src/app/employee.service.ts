import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, CreateEmployeeDto, updateEmployeeDto, Department } from '@shared';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private empModal: Model<Employee>,
    @InjectModel(Department.name) private depModal: Model<Department>
  ) {}

  async createEmployee(body: CreateEmployeeDto) {
    const isExist = await this.empModal.findOne({ email: body.email });
    if (isExist) {
      throw new RpcException({
        status: 404,
        message: 'Email already registered!',
      });
    }

    const isValidDept = await this.depModal.aggregate([
      {$match:{_id:body.departmentId}},
      {$limit:1}
    ])

    if (!isValidDept) {
        throw new RpcException({
            status: 404,
            message: 'Department id is not valid id!',
        });
    }
    const newEmployee = await this.empModal.create(body);
    const newEmp = await this.empModal.aggregate([
      {
        $match: { _id: newEmployee._id } 
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: '_id',
          as: 'department',
        },
      },
      {
        $unwind: {
          path: '$department',
          preserveNullAndEmptyArrays: true
        }
      },
    ])
    
    return {
      staus: 202,
      message: 'Employee create successfully',
      data: newEmp,
    };
  }

  async getAllEmployee() {
    return this.empModal.aggregate([
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: '_id',
          as: 'department',
        },
      },
      {
        $unwind: {
          path: '$department',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id:'$_id',
          name:'$name',
          email:'$email',
          phone:'$phone',
          department:{
            _id:'$department._id',
            name:'$department.name',
            description:'$department.description',
          },
          salary: '$salary',
          status: '$status',
        },
      },
    ]);
  }

  async updateEmployee(id: string, body: updateEmployeeDto) {
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
