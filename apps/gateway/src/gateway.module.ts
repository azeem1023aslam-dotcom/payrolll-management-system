import { Module } from '@nestjs/common';
import { SERVICES, SharedModule, RmqModule } from '@shared';
import {
  AuthGatewayController,
  DepartmentGatewayController,
  EmployeeGatewayController,
} from './app/controllers';
import {
  AuthGatewayService,
  DepartmentGatewayService,
  EmployeeGatewayService,
} from './app/services';
import { AttendanceGatewayController } from './app/controllers/attendance.controller';
import { AttendanceGatewayService } from './app/services/attendance.service';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([
      SERVICES.AUTH,
      SERVICES.EMPLOYEE,
      SERVICES.LEAVES,
      SERVICES.DEPARTMENT,
      SERVICES.ATTENDANCE,
    ]),
  ],
  controllers: [
    AuthGatewayController,
    EmployeeGatewayController,
    DepartmentGatewayController,
    AttendanceGatewayController,
  ],
  providers: [
    AuthGatewayService,
    EmployeeGatewayService,
    DepartmentGatewayService,
    AttendanceGatewayService,
  ],
})
export class GatewayModule {}
