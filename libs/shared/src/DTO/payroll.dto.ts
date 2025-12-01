import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class CreatePayrollDto {
  @IsMongoId()
  @ApiProperty({ example: '6776d99e3f2b2b2ac4a1e934' })
  employeeId: string;

  @ApiProperty({ example: '12' })
  @IsString()
  month: string;
}