import { Module } from '@nestjs/common';
// import { GatewayController } from './app/gateway.controller';
// import { GatewayService } from './app/gateway.service';
import { SERVICES,SharedModule,RmqModule } from '@shared';
import { AuthGatewayController } from './app/controllers/auth.controller';
import { AuthGatewayService } from './app/services/auth.service';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([
      SERVICES.AUTH,
      SERVICES.EMPLOYEE,
      SERVICES.LEAVES,
    ]),
  ],
  controllers: [AuthGatewayController],
  providers: [AuthGatewayService],
})
export class AppModule {}
