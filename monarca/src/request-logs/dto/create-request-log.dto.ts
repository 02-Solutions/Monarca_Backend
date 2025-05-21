import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateRequestLogDto {
  @ApiProperty({
    description: 'Request being logged',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsUUID()
  id_request: string;

  @ApiProperty({
    description: 'User who made the change',
    example: 'user-uuid-666',
  })
  @IsUUID()
  id_user: string;

  @ApiProperty({
    description: 'Status before the change',
    example: 'pending',
  })
  @IsString()
  old_status: string;

  @ApiProperty({
    description: 'Status after the change',
    example: 'approved',
  })
  @IsString()
  new_status: string;

  @ApiProperty({
    description: 'Date and time when the change occurred',
    example: '2025-04-17T22:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  change_date?: string;
}
