import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
