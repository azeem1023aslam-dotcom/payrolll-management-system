import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Employee,
  CreateEmployeeDto,
  updateEmployeeDto,
  Department,
} from '@shared';
import { RpcException } from '@nestjs/microservices';
import { pipe } from 'rxjs';
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
      { $match: { _id: body.departmentId } },
      { $limit: 1 },
    ]);

    if (!isValidDept) {
      throw new RpcException({
        status: 404,
        message: 'Department id is not valid id!',
      });
    }
    const newEmployee = await this.empModal.create(body);
    const newEmp = await this.empModal.aggregate([
      {
        $match: { _id: newEmployee._id },
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
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    return {
      staus: 202,
      message: 'Employee create successfully',
      data: newEmp,
    };
  }

  // get all employees

  async getAllEmployee(query: any) {
    const { page, limit, search, department } = query;
    const skip = (page - 1) * limit;

    let pipeline = [];

    // 1️⃣ Lookup departments
    pipeline.push({
      $lookup: {
        from: 'departments',
        localField: 'departmentId',
        foreignField: '_id',
        as: 'department',
      },
    });

    
    //search
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            {
              name: { $regex: search, $options: 'i' },
            },
          ],
        },
      });
    }

    // 2️⃣ Match by single departmentId if provided
    if (department) {
      const departmentIds = Array.isArray(department) ? department : [department];

      pipeline.push({
        $match: {
          departmentId: {
            $elemMatch: { $in: departmentIds.map(id => new mongoose.Types.ObjectId(id)) },
          },
        },
      });
    }

    // Project fields
    pipeline.push({
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        phone: 1,
        salary: 1,
        status: 1,
        department: {
          $map: {
            input: '$department',
            as: 'd',
            in: {
              _id: '$$d._id',
              name: '$$d.name',
              description: '$$d.description',
            },
          },
        },
      },
    });

    // pagination
    pipeline.push(
      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [{ $count: 'count' }],
        },
      },
      {
        $project: {
          data: 1,
          total: { $ifNull: [{ $arrayElemAt: ['$totalCount.count', 0] }, 0] },
        },
      }
    );

    const result = await this.empModal.aggregate(pipeline);
    const { data, total } = result[0];

    return {
      data: data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
