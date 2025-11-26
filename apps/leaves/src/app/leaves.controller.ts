import { Controller } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateLeavesDto } from '@shared';

@Controller()
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @MessagePattern('leaves.create')
  async createLeave(body: CreateLeavesDto) {
    return this.leavesService.createLeave(body);
  }

  @MessagePattern('leaves.getAll')
  async getAllLeaves() {
    return this.leavesService.getAllLeaves();
  }

}