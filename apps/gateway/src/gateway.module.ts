import { AuthModule } from './../../auth/src/auth.module';
import { Module } from '@nestjs/common';
import { SERVICES, SharedModule, RmqModule, AuthStrategy, RoleBaseGuardsGuard } from '@shared';
import {
  AuthGatewayController,
  DepartmentGatewayController,
  EmployeeGatewayController,
  LeavesGatewayController,
} from './app/controllers';
import {
  ActivityLogGatewayService,
  AuthGatewayService,
  DepartmentGatewayService,
  EmployeeGatewayService,
  LeavesGatewayService,
} from './app/services';
import { AttendanceGatewayController } from './app/controllers/attendance.controller';
import { AttendanceGatewayService } from './app/services/attendance.service';
import { APP_GUARD } from '@nestjs/core';
import { ActivityLogsGatewayController } from './app/controllers/activityLogs.controller';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    RmqModule.registerMultipleAsync([
      SERVICES.AUTH,
      SERVICES.EMPLOYEE,
      SERVICES.DEPARTMENT,
      SERVICES.ATTENDANCE,
      SERVICES.LEAVES,
      SERVICES.ACTIVITY_LOGS
    ]),
  ],
  controllers: [
    AuthGatewayController,
    EmployeeGatewayController,
    DepartmentGatewayController,
    AttendanceGatewayController,
    LeavesGatewayController,
    ActivityLogsGatewayController
  ],
  providers: [
    AuthStrategy,
    {
      provide: APP_GUARD,
      useClass: RoleBaseGuardsGuard,
    },
    AuthGatewayService,
    EmployeeGatewayService,
    DepartmentGatewayService,
    AttendanceGatewayService,
    LeavesGatewayService,
    ActivityLogGatewayService
  ],
})
export class GatewayModule {}
