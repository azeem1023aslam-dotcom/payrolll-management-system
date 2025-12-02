import { Controller } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { MessagePattern } from '@nestjs/microservices';
import { updateLeavesDto, updateLeavesStatusDto } from '@shared';
@Controller()
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @MessagePattern('leaves.create')
  async createLeave(data: any) {
    const { userId, ...body } = data;
    return this.leavesService.createLeave(body, userId);
  }

  @MessagePattern('leaves.getAll')
  async getAllLeaves() {
    return this.leavesService.getAllLeaves();
  }

  @MessagePattern('leaves.update')
  async updateLeave(data: { id: string; body: updateLeavesDto }) {
    return this.leavesService.updateLeave(data.id, data.body);
  }

  @MessagePattern('leaves.updateStatus')
  async updateLeaveStatus(data: { id: string; body: updateLeavesStatusDto }) {
    return this.leavesService.updateLeaveStatusById(data.id, data.body);
  }

  @MessagePattern('leaves.history')
  async getLeaveHistory(userId:any) {
    return this.leavesService.leavesHistory(userId);
  }

}