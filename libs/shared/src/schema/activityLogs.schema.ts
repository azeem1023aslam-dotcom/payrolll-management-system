import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({timestamps:true})
export class ActivityLog extends Document {
    @Prop({ type: mongoose.Types.ObjectId, ref: 'signup' })
    userId: mongoose.Types.ObjectId;
  
    @Prop({ required: true })
    action: string;
    
    @Prop()
    message: string;
  }
  

export const activityLogsSchema = SchemaFactory.createForClass(ActivityLog)