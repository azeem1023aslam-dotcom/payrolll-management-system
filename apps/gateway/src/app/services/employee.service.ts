import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from '@shared';
import { firstValueFrom } from 'rxjs';
import { CreateEmployeeDto } from './../../../../../libs/shared/src/DTO/employee.dto';

@Injectable()
export class EmployeeGatewayService {
  constructor(@Inject(SERVICES.EMPLOYEE) private employeeClient: ClientProxy) {}

  async createEmployee(body: CreateEmployeeDto) {
    try {
      const result = await firstValueFrom(
        this.employeeClient.send('employee.create', body)
      );
      return result;
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'Internal server error',
      };
    }
  }

  async getAllEmployee() {
    try {
      const result = await firstValueFrom(
        this.employeeClient.send('employee.get', {})
      );
      return result;
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'Internal server error',
      };
    }
  }

  async updateEmployee(id:string,body:CreateEmployeeDto) {
    try {
      const result = await firstValueFrom(
        this.employeeClient.send('employee.update', {id,body})
      );
      return result;
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'Internal server error',
      };
    }
  }

  async deleteEmployee(id:string) {
    try {
      const result = await firstValueFrom(
        this.employeeClient.send('employee.delete', id)
      );
      return result;
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'Internal server error',
      };
    }
  }
}
