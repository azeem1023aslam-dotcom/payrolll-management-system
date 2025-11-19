import { Module } from '@nestjs/common';
import { GatewayController } from './app/gateway.controller';
import { GatewayService } from './app/gateway.service';
import { SERVICES } from '@shared/constants';
import { RmqModule } from '@shared/rmq.module';
import { SharedModule } from '@shared/shared.module';
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
