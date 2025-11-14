import { Controller, Get } from '@nestjs/common';
import { LeavesService } from './leaves.service';

@Controller()
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @Get()
  getData() {
    return this.leavesService.getData();
  }
}
