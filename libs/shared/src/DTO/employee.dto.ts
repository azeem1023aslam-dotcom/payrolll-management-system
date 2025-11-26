import {
  IsString,
  IsEmail,
  IsMongoId,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class CreateEmployeeDto {
  @IsString()
  @ApiProperty({example:'Azeem Aslam'})
  name: string;

  @IsEmail()
  @ApiProperty({example:'azeem@gmail.com'})
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({example:'03040000000'})
  phone?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({example:new mongoose.Types.ObjectId()})
  departmentId?: mongoose.Types.ObjectId;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({example:'50000'})
  salary?: number;

  @IsOptional()
  @ApiProperty({example:true})
  status?: true
}

export class updateEmployeeDto extends PartialType(CreateEmployeeDto) {}