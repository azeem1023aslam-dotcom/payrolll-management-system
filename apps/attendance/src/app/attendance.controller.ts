import { Controller } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller()
export class AttendanceController {
  constructor(private readonly attService: AttendanceService) {}

}
