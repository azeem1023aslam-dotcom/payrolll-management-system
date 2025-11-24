import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from '@shared';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AttendanceGatewayService {
  constructor(@Inject(SERVICES.ATTENDANCE) private attendanceClient: ClientProxy) {}

}