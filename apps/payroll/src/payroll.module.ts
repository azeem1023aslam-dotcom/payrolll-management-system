import {  SERVICES, SharedModule,Payroll,payrollSchema } from '@shared';
import { Module } from '@nestjs/common';
import { RmqModule } from '../../../libs/shared/src/lib/rmq.module';
import { PayrollController } from './app/payroll.controller';
import { PayrollService } from './app/payroll.service';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.PAYROLL]),
  ],
  controllers: [PayrollController],
  providers: [PayrollService],
})
export class PayrollModule {}
