import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { signup } from "./auth.schema";

@Schema({timestamps:true})
export class Leave {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'signup' })
  userId: mongoose.Types.ObjectId;

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