import {
    IsString,
    IsEnum,
  } from 'class-validator';
  import { ApiProperty, PartialType } from '@nestjs/swagger';
  
  export class CreateLeavesDto {

    @IsString()
    @ApiProperty({example:'sick'})
    leaveType: string;

    @IsString()
    @ApiProperty({example:'2025-11-26'})
    fromDate: string;

    @IsString()
    @ApiProperty({example:'2025-11-26'})
    toDate: string;

    @IsString()
    @ApiProperty({example:'I am sick'})
    reason: string;

    @IsEnum(['pending','approved','rejected'])
    @ApiProperty({example:'pending', enum:['pending','approved','rejected'],default:'pending'})
    status: string;
  }
  
  export class updateLeavesDto extends PartialType(CreateLeavesDto) {}