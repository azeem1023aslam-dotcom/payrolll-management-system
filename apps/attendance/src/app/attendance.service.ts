import { Attendance } from './../../../../libs/shared/src/schema/attendance.scham';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AttendanceService {
  constructor(@InjectModel(Attendance.name) private attModal: Model<Attendance>) {}

}
