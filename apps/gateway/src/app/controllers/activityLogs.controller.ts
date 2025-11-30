import {
    Controller,
    Get,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActivityLogGatewayService } from '../services';
  @ApiTags('Activity Logs')
  @ApiBearerAuth()
  @Controller('activityLogs')

  export class ActivityLogsGatewayController {
    constructor(private readonly activityGatewayService: ActivityLogGatewayService) {}
  
    // @Post(SERVICES.ACTIVITY_LOGS)
    // createActivityLog(@Body() body: activityLogsDto) {
    //   return this.activityGatewayService.createActivityLog(body);
    // }
  
    @Get('get-all-logs')
    getAllActivityLogs() {
      return this.activityGatewayService.getAllLogs();
    }
  }  