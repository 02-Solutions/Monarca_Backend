import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Length, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightDto } from './create-flight.dto';

export class UpdateFlightDto extends PartialType(CreateFlightDto) {
  @ApiProperty({
    example: 1,
    description: 'ID of the request destination associated with the flight',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  id_request_destination?: number;

  @ApiProperty({
    example: '2023-12-15T08:00:00Z',
    description: 'Scheduled departure time with timezone',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  departure_time?: Date;

  @ApiProperty({
    example: '2023-12-15T10:30:00Z',
    description: 'Scheduled arrival time with timezone',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  arrival_time?: Date;

  @ApiProperty({
    example: 'JFK',
    description: 'IATA code of the departure airport',
    maxLength: 10,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  departure_airport?: string;

  @ApiProperty({
    example: 'LAX',
    description: 'IATA code of the arrival airport',
    maxLength: 10,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  arrival_airport?: string;

  @ApiProperty({
    example: 'AA123',
    description: 'Flight number',
    maxLength: 10,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  flight_number?: string;
}