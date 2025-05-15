// src/requests/dto/update-request.dto.ts

import { PartialType, OmitType } from '@nestjs/swagger';
import { IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateRequestDto } from './create-request.dto';
import { UpdateRequestsDestinationDto } from 'src/requests-destinations/dto/update-requests-destination.dto';

// 1) First strip out requests_destinations from CreateRequestDto
type _Base = Omit<CreateRequestDto, 'requests_destinations'>;

// 2) Make everything else partial
export class UpdateRequestDto extends PartialType(
  OmitType(CreateRequestDto, ['requests_destinations'] as const),
) {
  // 3) Re-add your own, properly typed, nested array
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRequestsDestinationDto)
  requests_destinations?: UpdateRequestsDestinationDto[];
}
