import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Payroll {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true })
  employeeId: string;

  @Prop({ required: true })
  month: string;

  @Prop({ required: true })
  basicSalary: number;

  @Prop({ required: true })
  totalDays: number;

  @Prop({ required: true })
  presentDays: number;

  @Prop({ required: true })
  paidLeaves: number;

  @Prop({ required: true })
  unpaidLeaves: number;

  @Prop({ required: true })
  unpaidAmount: number;

  @Prop({ required: true })
  netSalary: number;

  @Prop({ required: true })
  status: string;
}

export const payrollSchema = SchemaFactory.createForClass(Payroll);