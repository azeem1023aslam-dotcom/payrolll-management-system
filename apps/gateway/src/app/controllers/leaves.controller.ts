import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { CreateLeavesDto } from '@shared';
import { LeavesGatewayService } from '../services/leaves.service';
import { Request } from 'express';
  
  @ApiTags('Leaves')
  @ApiBearerAuth()
  @Controller('leaves')
  export class LeavesGatewayController {
    constructor(
      private readonly leavesGatewayService: LeavesGatewayService
    ) {}
  
    @Post('create-leave')
    createLeave(@Body() body: CreateLeavesDto, @Req() req: Request) {
      const userId = (req as any).user?.userId;
      if (!userId) {
        throw new UnauthorizedException('User not authenticated');
      }
      return this.leavesGatewayService.createLeave({ ...body, userId });
    }

    @Get('get-all-leaves')
    getAllLeaves() {
      return this.leavesGatewayService.getAllLeaves();
    }
  }