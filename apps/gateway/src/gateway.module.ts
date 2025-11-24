import { Module } from '@nestjs/common';
import { SERVICES, SharedModule, RmqModule } from '@shared';
import {
  AuthGatewayController,
  EmployeeGatewayController,
} from './app/controllers';
import { AuthGatewayService, EmployeeGatewayService } from './app/services';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([
      SERVICES.AUTH,
      SERVICES.EMPLOYEE,
      SERVICES.LEAVES,
    ]),
  ],
  controllers: [AuthGatewayController, EmployeeGatewayController],
  providers: [AuthGatewayService, EmployeeGatewayService],
})
export class GatewayModule {}
