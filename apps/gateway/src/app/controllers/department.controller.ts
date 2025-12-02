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
import { DepartmentGatewayService } from '../services/department.service';
import { CreateDepartmentDto, LogActivity, Roles, updateDepartmentDto } from '@shared';
  
  @ApiTags('Department')
  @ApiBearerAuth()
  @Controller('department')
  export class DepartmentGatewayController {
    constructor(
      private readonly departmentGatewayService: DepartmentGatewayService
    ) {}
  
    @Roles('admin')
    @LogActivity('create department')
    @Post('create-department')
    createDepartment(@Body() body: CreateDepartmentDto) {
      return this.departmentGatewayService.createDepartment(body);
    }
  
    @Roles('admin')
    @Get('get-all-departments')
    getAllDepartments() {
      return this.departmentGatewayService.getAllDepartment();
    }
  
  @LogActivity('department updated')
    @Patch(':id')
    @Roles('admin')
    updateDepartment(@Param('id') id: string, @Body() body: updateDepartmentDto) {
      return this.departmentGatewayService.updateDepartment(id, body);
    }
  
  @LogActivity('department delete')
    @Delete(':id')
    @Roles('admin')
    deleteDepartment(@Param('id') id: string) {
      return this.departmentGatewayService.deleteDepartment(id);
    }
  }