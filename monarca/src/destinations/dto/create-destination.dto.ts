import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateDestinationDto {
  @ApiProperty({
    description: 'Country of Destination',
    example: 'Spain',
  })
  @IsString()
  @Length(2, 100)
  country: string;

  @ApiProperty({
    description: 'City of destination',
    example: 'Madrid',
  })
  @IsString()
  @Length(2, 100)
  city: string;
}
