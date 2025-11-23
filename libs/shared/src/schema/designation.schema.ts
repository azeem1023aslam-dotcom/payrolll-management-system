import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({timestamps:true})
export class Designation extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Department' })
  department: string;

  @Prop()
  level: string;
}

export const designationSchema = SchemaFactory.createForClass(Designation)
