import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps:true})
export class Attendance {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Employee' })
  employee: string;

  @Prop()
  checkIn: string;

  @Prop()
  checkOut: string;

  @Prop({ default: 'present' })
  status: 'present' | 'absent' | 'leave';
}
export const attendanceSchema = SchemaFactory.createForClass(Attendance)

