import { Module } from '@nestjs/common';
import { GatewayController } from './app/gateway.controller';
import { GatewayService } from './app/gateway.service';
import { SERVICES,SharedModule,RmqModule } from '@shared';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([
      SERVICES.AUTH,
      SERVICES.EMPLOYEE,
      SERVICES.LEAVES,
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class AppModule {}
