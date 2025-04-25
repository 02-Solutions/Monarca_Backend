import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightDto } from './create-flight.dto';

export class UpdateFlightDto extends PartialType(CreateFlightDto) {}
