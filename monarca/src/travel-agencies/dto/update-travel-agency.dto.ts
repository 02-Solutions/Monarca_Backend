import { PartialType } from '@nestjs/swagger';
import { CreateTravelAgencyDto } from './create-travel-agency.dto';

export class UpdateTravelAgencyDto extends PartialType(CreateTravelAgencyDto) {}
