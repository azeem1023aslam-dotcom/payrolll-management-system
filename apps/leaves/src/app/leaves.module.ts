import { Module } from '@nestjs/common';
import { LeavesController } from './leaves.controller';
import { LeavesService } from './leaves.service';

@Module({
  imports: [],
  controllers: [LeavesController],
  providers: [LeavesService],
})
export class AppModule {}
