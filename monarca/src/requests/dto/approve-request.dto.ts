import { ApiProperty } from '@nestjs/swagger';

import { IsUUID } from 'class-validator';

export class ApproveRequestDTO {
  @ApiProperty({
    description: 'Travel Agency Id',
    example: 'travel-agency-uuid-000',
  })
  @IsUUID()
  id_travel_agency: string;
}
