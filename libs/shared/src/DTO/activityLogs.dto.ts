import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class activityLogsDto {
  @IsMongoId()
  @ApiProperty({ example: '475837493748573847' })
  userId: string;

  @IsString()
  @ApiProperty({ example: 'create' })
  action: string;

  @IsString()
  @ApiProperty({ example: '4u3847384738473998998' })
  targetId: string;

  @IsString()
  @ApiProperty({ example: 'employee' })
  targetModel: string;
}
