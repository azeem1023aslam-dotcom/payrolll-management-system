import { Controller } from '@nestjs/common';
import { ActivityLogsService } from './activityLogs.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
@Controller()
export class ActivityLogsController {
  constructor(private readonly activityLogsService: ActivityLogsService) {}

  @EventPattern('create_activity_log')
  async createActivityLog(body: any) {
    return this.activityLogsService.createActivityLog(body);
  }

  @MessagePattern('logs.getAll')
  async getAllActivityLogs() {
    return this.activityLogsService.getAllActivityLogs();
  }

}