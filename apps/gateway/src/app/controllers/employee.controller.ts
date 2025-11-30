import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Search,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
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
  @LogActivity('employee create')
  createEmployee(@Body() body: CreateEmployeeDto) {
    return this.employeeGatewayService.createEmployee(body);
  }

  @Get('get-all-employees')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({
    name: 'department',
    required: false,
    type: String,
    isArray: true,
    description:
      'Filter by one or more department IDs (comma separated in Swagger)',
  })
  getAllEmployees(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('department') department?: string | string[]
  ) {
    return this.employeeGatewayService.getAllEmployee({
      page,
      limit,
      search,
      department,
    });
  }

  @LogActivity('employee updated')
  @Patch(':id')
  updateEmp(@Param('id') id: string, @Body() body: updateEmployeeDto) {
    return this.employeeGatewayService.updateEmployee(id, body);
  }

  @LogActivity('employee delete')
  @Delete(':id')
  deleteEmployee(@Param('id') id: string) {
    return this.employeeGatewayService.deleteEmployee(id);
  }
}
