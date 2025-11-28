import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps:true})
export class ActivityLog extends Document {
    @Prop({ type: mongoose.Types.ObjectId, ref: 'signup' })
    userId: mongoose.Types.ObjectId;
  
    @Prop({ required: true })
    action: string;
  
    @Prop()
    targetId: string;
  
    @Prop()
    targetModel: string;
  
    @Prop()
    description: string;
  }
  

export const activityLogsSchema = SchemaFactory.createForClass(ActivityLog)