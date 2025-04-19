import { Module } from '@nestjs/common';
import { HotelReservationsService } from './hotel-reservations.service';
import { HotelReservationsController } from './hotel-reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelReservation } from './entity/hotel-reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelReservation])],
  // TypeOrmModule.forFeature([HotelReservations]) es un método que permite importar entidades de TypeORM en un módulo de NestJS.
  // Esto es útil para que el módulo pueda interactuar con la base de datos utilizando esas entidades.
  // En este caso, estamos importando la entidad HotelReservations para que el módulo pueda realizar operaciones CRUD en la tabla correspondiente en la base de datos.

  providers: [HotelReservationsService],
  controllers: [HotelReservationsController]
})
export class HotelReservationsModule {}
