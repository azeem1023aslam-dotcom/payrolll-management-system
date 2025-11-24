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
  import { CreateEmployeeDto } from 'libs/shared/src/DTO/employee.dto';
import { DepartmentGatewayService } from '../services/department.service';
import { CreateDepartmentDto } from 'libs/shared/src/DTO/department.dto';
  
  @ApiTags('Department')
  @ApiBearerAuth()
  @Controller('department')
  export class DepartmentGatewayController {
    constructor(
      private readonly departmentGatewayService: DepartmentGatewayService
    ) {}
  
    @Post('create-department')
    createDepartment(@Body() body: CreateDepartmentDto) {
      return this.departmentGatewayService.createDepartment(body);
    }
  
    @Get('get-all-departments')
    getAllDepartments() {
      return this.departmentGatewayService.getAllDepartment();
    }
  
    @Patch(':id')
    updateDepartment(@Param('id') id: string, @Body() body: CreateDepartmentDto) {
      return this.departmentGatewayService.updateDepartment(id, body);
    }
  
    @Delete(':id')
    deleteDepartment(@Param('id') id: string) {
      return this.departmentGatewayService.deleteDepartment(id);
    }
  }  