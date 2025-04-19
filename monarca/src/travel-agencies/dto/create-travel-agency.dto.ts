import { ApiProperty } from '@nestjs/swagger';

export class CreateTravelAgencyDto {
  @ApiProperty({
    description: 'The name of the travel agency',
    example: 'Travel Agency',
  })
  name: string;
}
