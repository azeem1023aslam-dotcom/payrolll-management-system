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
import { LogActivity, Roles } from '@shared';
import { EmployeeGatewayService } from '../services/employee.service';
import { CreateEmployeeDto, updateEmployeeDto } from '@shared';

@ApiTags('Employee')
@ApiBearerAuth()
@Controller('employee')
export class EmployeeGatewayController {
  constructor(
    private readonly employeeGatewayService: EmployeeGatewayService
  ) {}
  
  @Roles('admin')
  @Post('create-employee')
  @LogActivity('Create-Employee')
  createEmployee(@Body() body: CreateEmployeeDto) {
    return this.employeeGatewayService.createEmployee(body);
  }

  @Get('get-all-employees')
  getAllEmplpoyees() {
    return this.employeeGatewayService.getAllEmployee();
  }

  @Patch(':id')
  updateEmp(@Param('id') id: string, @Body() body: updateEmployeeDto) {
    return this.employeeGatewayService.updateEmployee(id, body);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: string) {
    return this.employeeGatewayService.deleteEmployee(id);
  }
}
