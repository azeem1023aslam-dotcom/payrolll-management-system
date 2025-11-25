import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({timestamps:true})
export class Attendance extends Document {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Employee' })
  employeeId: mongoose.Types.ObjectId;

  @Prop()
  checkIn: string;

  @Prop()
  checkOut: string;

  @Prop({ default: 'present' })
  status: 'present' | 'absent' | 'leave';
}
export const attendanceSchema = SchemaFactory.createForClass(Attendance)
