import { ActivityLog } from '@shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ActivityLogsService {
  constructor(
    @InjectModel(ActivityLog.name) private activityLogsModal: Model<ActivityLog>
  ) {}

  async createActivityLog(body: any) {
      const activityLog = await this.activityLogsModal.create(body);
      return {
        status: 200,
        message: 'Activity log created successfully',
        data: activityLog,
      };
  }

  async getAllActivityLogs() {
    return this.activityLogsModal.find();
  }
  
}
