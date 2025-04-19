import { PartialType } from '@nestjs/swagger';
import { CreateRequestsDestinationDto } from './create-requests-destination.dto';

export class UpdateRequestsDestinationDto extends PartialType(CreateRequestsDestinationDto) {}
