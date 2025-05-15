import {
  IsUUID,
  IsInt,
  IsDateString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateRequestsDestinationDto {
  @IsOptional()
  @IsUUID()
  id?: string; // include when updating existing

  @IsUUID()
  id_destination: string;

  @IsInt()
  destination_order: number;

  @IsInt()
  stay_days: number;

  @IsDateString()
  arrival_date: string;

  @IsDateString()
  departure_date: string;

  @IsOptional()
  @IsBoolean()
  is_hotel_required?: boolean;

  @IsOptional()
  @IsBoolean()
  is_plane_required?: boolean;

  @IsOptional()
  @IsBoolean()
  is_last_destination?: boolean;

  @IsOptional()
  details?: string;
}
