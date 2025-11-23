import {
  IsString,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @IsString()
  @ApiProperty({example:'Azeem Aslam'})
  name: string;

  @IsEmail()
  @ApiProperty({example:'azeem@gmail.com'})
  email: string;

  @IsEnum(['male', 'female', 'other'])
  @ApiProperty({example:'male'})
  gender: 'male' | 'female' | 'other';

  @IsOptional()
  @IsString()
  @ApiProperty({example:'03040000000'})
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({example:'lahore'})
  address?: string;

  // @IsOptional()
  // @IsMongoId()
  // @ApiProperty({example:'983947397397489'})
  // department?: string;

  // @IsOptional()
  // @IsMongoId()
  // @ApiProperty({example:'898793594357947'})
  // designation?: string;

  // @IsOptional()
  // @IsDateString()
  // @ApiProperty({example:'11/22/2025'})
  // joiningDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({example:'50000'})
  salary?: number;

  @IsOptional()
  @ApiProperty({example:true})
  status?: true
}