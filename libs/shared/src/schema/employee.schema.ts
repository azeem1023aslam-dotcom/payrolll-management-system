import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({timestamps:true})
export class Employee extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Department' })
  departmentId: mongoose.Types.ObjectId[];

  @Prop()
  salary: number;

  @Prop({ default: true })
  status: boolean;
}

export const employeeSchema = SchemaFactory.createForClass(Employee)