import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from '@shared';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ActivityLogGatewayService {
  constructor(@Inject(SERVICES.ACTIVITY_LOGS) private logsClient: ClientProxy) {}
  async createActivityLog(body: any) {
    try {
      const result = await firstValueFrom(
        this.logsClient.emit('create_activity_log', body)
      );
      return result;
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'Internal server error',
      };
    }
  }

  async getAllLogs() {
    try {
      const result = await firstValueFrom(
        this.logsClient.send('logs.getAll', {})
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