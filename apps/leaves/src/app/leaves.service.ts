import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Leave, signup, updateLeavesDto, updateLeavesStatusDto } from '@shared';
import { Model } from 'mongoose';

@Injectable()
export class LeavesService {
  constructor(
    @InjectModel(Leave.name) private leavesModal: Model<Leave>,
    @InjectModel(signup.name) private AuthModal: Model<signup>
  ) {}

  async createLeave(body: any, userId: string) {
    try {
      body.userId = userId;
      body.status = 'pending';
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
    const leaves = await this.leavesModal.aggregate([
      {
        $addFields: {
          userIdObject: {
            $convert: {
              input: '$userId',
              to: 'objectId',
              onError: null, // Agar conversion fail ho (bool ya invalid string ho), toh null set karein
              onNull: null, // Agar userId null ho, toh null set karein
            },
          },
        },
      },

      // Filter out documents jinka userIdObject null hai (invalid data)
      {
        $match: { userIdObject: { $ne: null } },
      },

      // $lookup mein ab ObjectId ka use karein
      {
        $lookup: {
          from: 'signups',
          localField: 'userIdObject',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $unwind: {
          path: '$userInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          leaveType: 1,
          fromDate: 1,
          toDate: 1,
          status: 1,
          reason: 1,
          userId: 1,
          userInfo: {
            _id: 1,
            name: 1,
            email: 1,
            phone: 1,
          },
        },
      },
    ]);
    return {
      status: 200,
      message: 'Leaves fetched successfully',
      data: leaves,
    };
  }

  async updateLeave(id: string, body: updateLeavesDto) {
    const leave = await this.leavesModal.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!leave) {
      throw new RpcException({
        status: 404,
        message: 'Leave not found',
      });
    }
    return {
      status: 200,
      message: 'Leave updated successfully',
      data: leave,
    };
  }

  async updateLeaveStatusById(id: string, body: updateLeavesStatusDto) {
    const leave = await this.leavesModal.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!leave) {
      throw new RpcException({
        status: 404,
        message: 'Leave not found',
      });
    }
    return {
      status: 200,
      message: 'Leave status updated successfully',
      data: leave,
    };
  }

  async leavesHistory(userId: any) {
    const result = await this.leavesModal.find({ userId: userId });
    return {
      message: 'successfully',
      data: result,
    };
  }
}
