import { ApiProperty, PartialType } from '@nestjs/swagger';
import { TravelAgency } from '../entities/travel-agency.entity';
import { OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTravelAgencyDto {
  @ApiProperty({
    description: 'The name of the travel agency',
    example: 'Travel Agency',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateTravelAgencyDto extends PartialType(CreateTravelAgencyDto) {}

export class TravelAgencyDto extends OmitType(TravelAgency, []) {}
