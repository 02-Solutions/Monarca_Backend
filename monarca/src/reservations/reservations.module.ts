import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationsService],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
