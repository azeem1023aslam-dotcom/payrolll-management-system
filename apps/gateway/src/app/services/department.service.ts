import { CreateDepartmentDto } from './../../../../../libs/shared/src/DTO/department.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from '@shared';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DepartmentGatewayService {
  constructor(@Inject(SERVICES.DEPARTMENT) private departmentClient: ClientProxy) {}

  async createDepartment(body: CreateDepartmentDto) {
    try {
      const result = await firstValueFrom(
        this.departmentClient.send('department.create', body)
      );
      return result;
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'Internal server error',
      };
    }
  }

  async getAllDepartment() {
    try {
      const result = await firstValueFrom(
        this.departmentClient.send('department.get', {})
      );
      return result;
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'Internal server error',
      };
    }
  }

  async updateDepartment(id:string,body:CreateDepartmentDto) {
    try {
      const result = await firstValueFrom(
        this.departmentClient.send('department.update', {id,body})
      );
      return result;
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'Internal server error',
      };
    }
  }

  async deleteDepartment(id:string) {
    try {
      const result = await firstValueFrom(
        this.departmentClient.send('department.delete', id)
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