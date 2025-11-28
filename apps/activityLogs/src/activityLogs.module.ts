import { ActivityLogsService } from './app/activityLogs.service';
import { ActivityLogsController } from './app/activityLogs.controller';
import { SERVICES, SharedModule } from '../../../libs/shared/src/index';
import { Module } from '@nestjs/common';
import { RmqModule } from '../../../libs/shared/src/lib/rmq.module';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.ACTIVITY_LOGS])
  ],
  controllers: [ActivityLogsController],
  providers: [ActivityLogsService],
})
export class ActivityLogsModule {}
