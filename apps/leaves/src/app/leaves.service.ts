import { Injectable } from '@nestjs/common';

@Injectable()
export class LeavesService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
