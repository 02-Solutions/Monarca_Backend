import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsInt,
  IsBoolean,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRequestsDestinationDto {
  @ApiProperty({
    description: 'Destination reference ID',
    example: 'dest-uuid-222',
  })
  @IsUUID()
  destinationId: string;

  @ApiProperty({
    description: 'Parent request ID',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsUUID()
  requestId: string;

  @ApiProperty({
    description: 'Order of this stop in the trip',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  destinationOrder: number;

  @ApiProperty({
    description: 'Number of days to stay',
    example: 3,
  })
  @Type(() => Number)
  @IsInt()
  stayDays: number;

  @ApiProperty({
    description: 'Arrival timestamp',
    example: '2025-05-01T10:00:00Z',
  })
  @IsDateString()
  arrivalDate: Date;

  @ApiProperty({
    description: 'Departure timestamp',
    example: '2025-05-04T18:00:00Z',
  })
  @IsDateString()
  departureDate: Date;

  @ApiProperty({
    description: 'Whether a hotel booking is needed',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isHotelRequired?: boolean;

  @ApiProperty({
    description: 'Whether a flight booking is needed',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPlaneRequired?: boolean;

  @ApiProperty({
    description: 'Flag marking the final destination in this trip',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isLastDestination?: boolean;
}
