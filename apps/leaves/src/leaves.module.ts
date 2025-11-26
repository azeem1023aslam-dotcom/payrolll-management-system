import { Leave, leavesSchema, SERVICES, SharedModule } from '@shared';
import { Module } from '@nestjs/common';
import { LeavesService } from './app/leaves.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RmqModule } from '../../../libs/shared/src/lib/rmq.module';
import { LeavesController } from './app/leaves.controller';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.LEAVES]),
    MongooseModule.forFeature([
      {
        name: Leave.name,
        schema: leavesSchema,
      },
    ]),
  ],
  controllers: [LeavesController],
  providers: [LeavesService],
})
export class LeavesModule {}
