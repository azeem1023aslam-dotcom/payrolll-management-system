import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps:true})
export class Payroll {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Employee' })
  employee: string;

  @Prop()
  month: string;

  @Prop()
  totalDays: number;

  @Prop()
  presentDays: number;

  @Prop()
  absentDays: number;

  @Prop()
  leaveDays: number;

  @Prop()
  overtimeHours: number;

  @Prop()
  grossSalary: number;

  @Prop()
  status: 'paid' | 'unpaid';
}

export const payrollSchema = SchemaFactory.createForClass(Payroll)