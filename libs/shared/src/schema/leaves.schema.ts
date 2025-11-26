import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps:true})
export class Leave {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Employee' })
  userId: string;

  @Prop({ required: true })
  leaveType: string;

  @Prop()
  fromDate: string;

  @Prop()
  toDate: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';

  @Prop()
  reason: string;
}

export const leavesSchema = SchemaFactory.createForClass(Leave)