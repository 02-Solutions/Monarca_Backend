import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({
    description: 'User who created the request',
    example: 'user-uuid-123',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Admin responsible for approval',
    example: 'admin-uuid-456',
  })
  @IsUUID()
  adminId: string;

  @ApiProperty({
    description: 'Travel agent assigned',
    example: 'agent-uuid-789',
  })
  @IsUUID()
  travelAgentId: string;

  @ApiProperty({
    description: 'Origin city identifier',
    example: 'city-uuid-000',
  })
  @IsUUID()
  originCityId: string;

  @ApiProperty({
    description: 'Reason for the trip',
    example: 'Personal Vacations',
  })
  @IsString()
  motive: string;

  @ApiProperty({
    description: 'Flag for multi-user trip',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isMultiUser?: boolean;

  @ApiProperty({
    description: 'Current status of the request',
    example: 'pending',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Additional requirements or notes',
    example: 'Need a wheelchair for an elderly person',
    required: false,
  })
  @IsString()
  @IsOptional()
  requirements?: string;

  @ApiProperty({
    description: 'Priority level of the request',
    example: 'high',
  })
  @IsString()
  priority: string;

  @ApiProperty({
    description: 'Reason for cancellation, if any',
    example: null,
    required: false,
  })
  @IsString()
  @IsOptional()
  cancellationReason?: string;
}
