import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES, CreateEmployeeDto, updateEmployeeDto } from '@shared';
import { firstValueFrom } from 'rxjs';
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

  async getAllEmployee(query: any) {
    try {
      const result = await firstValueFrom(
        this.employeeClient.send('employee.get', query)
      );
      return result;
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'Internal server error',
      };
    }
  }

  async updateEmployee(id: string, body: updateEmployeeDto) {
    try {
      const result = await firstValueFrom(
        this.employeeClient.send('employee.update', { id, body })
      );
      return result;
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'Internal server error',
      };
    }
  }

  async deleteEmployee(id: string) {
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

  async getEmployeeProfile(id: string) {
    try {
      const result = await firstValueFrom(
        this.employeeClient.send('employee.profile', id)
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
