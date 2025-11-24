import {
    IsString,
    IsOptional,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateDepartmentDto {
    @IsString()
    @ApiProperty({example:'Development'})
    name: string;
  
    @IsOptional()
    @ApiProperty({example:'Development Department'})
    description?: string;
  }