import { AuthStrategy } from './../../auth/src/app/role-based-authorization/auth.strategy';
import { RoleBaseGuardsGuard } from './../../auth/src/app/role-based-authorization/roles.guard';
import { Module } from '@nestjs/common';
import { SERVICES, SharedModule, RmqModule } from '@shared';
import {
  AuthGatewayController,
  DepartmentGatewayController,
  EmployeeGatewayController,
  LeavesGatewayController,
} from './app/controllers';
import {
  AuthGatewayService,
  DepartmentGatewayService,
  EmployeeGatewayService,
  LeavesGatewayService,
} from './app/services';
import { AttendanceGatewayController } from './app/controllers/attendance.controller';
import { AttendanceGatewayService } from './app/services/attendance.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([
      SERVICES.AUTH,
      SERVICES.EMPLOYEE,
      SERVICES.DEPARTMENT,
      SERVICES.ATTENDANCE,
      SERVICES.LEAVES,
    ]),
  ],
  controllers: [
    AuthGatewayController,
    EmployeeGatewayController,
    DepartmentGatewayController,
    AttendanceGatewayController,
    LeavesGatewayController,
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
  ],
})
export class GatewayModule {}
