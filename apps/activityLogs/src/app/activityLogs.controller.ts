import { Controller } from '@nestjs/common';
import { ActivityLogsService } from './activityLogs.service';
import { MessagePattern } from '@nestjs/microservices';
@Controller()
export class ActivityLogsController {
  constructor(private readonly activityLogsService: ActivityLogsService) {}

  @MessagePattern('leaves.create')
  async createLeave(data: any) {
    const { userId, ...body } = data;
    return this.activityLogsService.createActivityLog(body, userId);
  }

  @MessagePattern('leaves.getAll')
  async getAllLeaves() {
    return this.activityLogsService.getAllActivityLogs();
  }

}