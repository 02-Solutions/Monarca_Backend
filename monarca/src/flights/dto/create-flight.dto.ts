import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Length, IsDateString } from 'class-validator';

export class CreateFlightDto {
  @ApiProperty({
    example: "1",
    description: 'ID of the request destination associated with the flight',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  id_request_destination: number;

  @ApiProperty({
    example: '2023-12-15T08:00:00Z',
    description: 'Scheduled departure time with timezone',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  departure_time: Date;

  @ApiProperty({
    example: '2023-12-15T10:30:00Z',
    description: 'Scheduled arrival time with timezone',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  arrival_time: Date;

  @ApiProperty({
    example: 'JFK',
    description: 'IATA code of the departure airport',
    maxLength: 10,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  departure_airport: string;

  @ApiProperty({
    example: 'LAX',
    description: 'IATA code of the arrival airport',
    maxLength: 10,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  arrival_airport: string;

  @ApiProperty({
    example: 'AA123',
    description: 'Flight number',
    maxLength: 10,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  flight_number: string;
}