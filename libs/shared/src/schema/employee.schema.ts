import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({timestamps:true})
export class Employee extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ enum: ['admin', 'hr', 'employee'], default: 'employee' })
  role: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  // @Prop({ type: mongoose.Types.ObjectId, ref: 'Department' })
  // department: string;

  // @Prop({ type: mongoose.Types.ObjectId, ref: 'Designation' })
  // designation: string;

  // @Prop()
  // joiningDate: Date;

  @Prop()
  salary: string;

  @Prop({ default: true })
  status: boolean;
}

export const employeeSchema = SchemaFactory.createForClass(Employee)