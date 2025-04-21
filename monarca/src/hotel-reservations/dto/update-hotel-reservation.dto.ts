import {CreateHotelReservationDto} from './create-hotel-reservation.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateHotelReservationDto extends PartialType(CreateHotelReservationDto) {
}



