import {
    IsString,
    IsEnum,
  } from 'class-validator';
  import { ApiProperty, PartialType } from '@nestjs/swagger';
  
  export enum LeaveStatus {
    APPROVED = 'approved',
    REJECTED = 'rejected'
  }

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
  }
  
  export class updateLeavesDto extends PartialType(CreateLeavesDto) {}

  export class updateLeavesStatusDto {
    @IsEnum(LeaveStatus)
    @ApiProperty({
      // example: LeaveStatus.APPROVED,
      enum: LeaveStatus,
      enumName: 'LeaveStatus',
      // default: LeaveStatus.APPROVED,
      description: 'Leave status'
    })
    status: LeaveStatus;
  }