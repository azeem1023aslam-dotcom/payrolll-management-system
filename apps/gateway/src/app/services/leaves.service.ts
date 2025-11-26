import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES, CreateLeavesDto } from '@shared';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class LeavesGatewayService {
  constructor(@Inject(SERVICES.LEAVES) private leavesClient: ClientProxy) {}

  async createLeave(body: any) {
    try {
      const result = await firstValueFrom(
        this.leavesClient.send('leaves.create', body)
      );
      return result;
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'Internal server error',
      };
    }
  }

  async getAllLeaves() {
    try {
      const result = await firstValueFrom(
        this.leavesClient.send('leaves.getAll', {})
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