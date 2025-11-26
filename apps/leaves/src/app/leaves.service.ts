import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLeavesDto, Leave } from '@shared';
import { Model } from 'mongoose';

@Injectable()
export class LeavesService {
  constructor(@InjectModel(Leave.name) private leavesModal: Model<Leave>) {}

  async createLeave(body: any) {
    try {
      const leave = await this.leavesModal.create(body);
      return {
        status: 200,
        message: 'Leave created successfully',
        data: leave,
      };
    } catch (error) {
      return {
        status: 404,
        message: error.message || 'Internal server error',
      };
    }
  }

  async getAllLeaves() {
    const leaves = await this.leavesModal.find();
    return {
      status: 200,
      message: 'Leaves fetched successfully',
      data: leaves,
    };
  }
}
