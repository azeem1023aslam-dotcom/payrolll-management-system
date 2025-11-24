import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AttendanceGatewayService } from '../services/attendance.service';
  
  @ApiTags('Attendance')
  @ApiBearerAuth()
  @Controller('attendance')
  export class AttendanceGatewayController {
    constructor(
      private readonly attendanceGatewayService: AttendanceGatewayService
    ) {}
  }  