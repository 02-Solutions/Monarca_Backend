import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HotelReservationsService } from './hotel-reservations.service';
import { CreateHotelReservationDto } from './dto/create-hotel-reservation.dto';
import { UpdateHotelReservationDto } from './dto/update-hotel-reservation.dto';

@Controller('hotel-reservations')
export class HotelReservationsController {
  //definir que estamos usando el servicio
  constructor(
    private readonly hotelReservationsService: HotelReservationsService,
  ) {}

  // decorador -funcionalidad extra a una función
  @Post()
  create(@Body() createHotelReservationDto: CreateHotelReservationDto) {
    return this.hotelReservationsService.create(createHotelReservationDto);
  }

  @Get()
  findAll() {
    return this.hotelReservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelReservationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHotelReservationDto: UpdateHotelReservationDto,
  ) {
    return this.hotelReservationsService.update(+id, updateHotelReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelReservationsService.remove(+id);
  }
}
