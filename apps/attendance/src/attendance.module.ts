import { SharedModule } from '@shared';
import { Module } from '@nestjs/common';
import { AttendanceService } from './app/attendance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RmqModule } from '../../../libs/shared/src/lib/rmq.module';
import { SERVICES } from '@shared';
import { Attendance, attendanceSchema } from 'libs/shared/src/schema/attendance.scham';
import { AttendanceController } from './app/attendance.controller';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.ATTENDANCE]),
    MongooseModule.forFeature([
      {
        name: Attendance.name,
        schema: attendanceSchema,
      },
    ]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
