import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateRequestStatusDto {
  @ApiProperty({
    description: 'New status for the request',
    example: 'approved',
    enum: ['pending', 'approved', 'cancelled'],
  })
  @IsString()
  @IsIn(['pending', 'approved', 'cancelled'])
  status: string;

  @ApiProperty({
    description: 'Reason for cancellation (only if status is cancelled)',
    example: 'Client decided not to travel',
    required: false,
  })
  @IsString()
  @IsOptional()
  cancellationReason?: string;
}
