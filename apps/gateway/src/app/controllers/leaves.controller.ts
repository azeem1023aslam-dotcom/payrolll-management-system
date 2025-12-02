import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateLeavesDto, LogActivity, Roles, updateLeavesDto, updateLeavesStatusDto } from '@shared';
import { LeavesGatewayService } from '../services/leaves.service';
import { Request } from 'express';

@ApiTags('Leaves')
@ApiBearerAuth()
@Controller('leaves')
export class LeavesGatewayController {
  constructor(private readonly leavesGatewayService: LeavesGatewayService) {}

  @Roles('employee')
  @LogActivity('apply leave')
  @Post('create-leave')
  createLeave(@Body() body: CreateLeavesDto, @Req() req: Request) {
    const userId = (req as any).user?.userId;
    
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.leavesGatewayService.createLeave({ ...body, userId });
  }

  @Roles('admin','employee')
  @Get('get-all-leaves')
  getAllLeaves() {
    return this.leavesGatewayService.getAllLeaves();
  }

  @Roles('employee')
  @Patch('update-leave/:id')
  updateLeaveById(@Param('id') id: string, @Body() body: updateLeavesDto) {
    return this.leavesGatewayService.updateLeaveById(id,body);
  }

  @Roles('admin')
  @Patch('update-leave-status/:id')
  updateLeaveStatusById(@Param('id') id: string, @Body() body: updateLeavesStatusDto) {
    return this.leavesGatewayService.updateLeaveStatusById(id,body);
  }

  @Roles('employee')
  @Get('leave-history')
  getLeaveHistory(@Req() req:any) {
    const userId = req.user.userId;
    return this.leavesGatewayService.getLeaveHistory(userId);
  }
}