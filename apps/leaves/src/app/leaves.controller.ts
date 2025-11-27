import { Controller } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { MessagePattern } from '@nestjs/microservices';
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

}