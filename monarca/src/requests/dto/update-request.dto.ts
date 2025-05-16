import { PartialType, OmitType } from '@nestjs/swagger';
import { IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateRequestDto } from './create-request.dto';
import { UpdateRequestsDestinationDto } from 'src/requests-destinations/dto/update-requests-destination.dto';

type _Base = Omit<CreateRequestDto, 'requests_destinations'>;

export class UpdateRequestDto extends PartialType(
  OmitType(CreateRequestDto, ['requests_destinations'] as const),
) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRequestsDestinationDto)
  requests_destinations?: UpdateRequestsDestinationDto[];
}
