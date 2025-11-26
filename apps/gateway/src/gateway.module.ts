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
    AuthGatewayService,
    EmployeeGatewayService,
    DepartmentGatewayService,
    AttendanceGatewayService,
    LeavesGatewayService,
  ],
})
export class GatewayModule {}
