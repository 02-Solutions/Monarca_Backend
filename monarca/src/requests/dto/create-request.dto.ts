import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsUUID,
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  IsInt,
  IsDate,
  ValidateNested,
} from 'class-validator';

export class RequestDestinationtDto {
  @ApiProperty({
    description: 'Destination city identifier',
    example: 'destination-uuid-000',
  })
  @IsUUID()
  id_destination: string;

  @ApiProperty({
    description: 'Order of the destination in the trip sequence',
    example: 1,
  })
  @IsInt()
  destination_order: number;

  @ApiProperty({
    description: 'Number of days for the stay at the destination',
    example: 5,
  })
  @IsInt()
  stay_days: number;

  @ApiProperty({
    description: 'Arrival date at the destination',
    example: '2025-05-01T10:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  arrival_date: Date;

  @ApiProperty({
    description: 'Departure date from the destination',
    example: '2025-05-06T10:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  departure_date: Date;

  @ApiProperty({
    description: 'Whether a hotel is required at the destination',
    example: true,
  })
  @IsBoolean()
  is_hotel_required: boolean;

  @ApiProperty({
    description: 'Whether a plane is required for the trip to the destination',
    example: true,
  })
  @IsBoolean()
  is_plane_required: boolean;

  @ApiProperty({
    description: 'Whether this is the last destination in the trip',
    example: true,
  })
  @IsBoolean()
  is_last_destination: boolean;

  @ApiProperty({
    description: 'Additional details or requirements for this destination',
    example: 'Hotel near downtown',
  })
  @IsString()
  details: string;
}

export class CreateRequestDto {
  @ApiProperty({
    description: 'Origin city identifier',
    example: '2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f',
  })
  @IsUUID()
  id_origin_city: string;

  @ApiProperty({
    description: 'Short title for the trip',
    example: 'On-Site Training Trip',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Detailed reason for the trip',
    example: 'I need to go on this trip because ...',
  })
  @IsString()
  motive: string;

  @ApiProperty({
    description: 'Money asked for in advance for the trip',
    example: 10000,
  })
  @IsInt()
  advance_money: number;

  @ApiProperty({
    description: 'Additional requirements or notes',
    example: 'Need a wheelchair for an elderly person',
  })
  @IsString()
  requirements: string;

  @ApiProperty({
    description: 'Priority level of the request',
    example: 'high',
  })
  @IsString()
  priority: string;

  @ApiProperty({
    description: 'List of destinations for the trip request',
    type: [RequestDestinationtDto],
  })
  @IsArray()
  @ValidateNested({ each: true }) // Validate each object in the array
  @Type(() => RequestDestinationtDto)
  requests_destinations: RequestDestinationtDto[];
}
