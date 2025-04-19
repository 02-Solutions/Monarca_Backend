import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './entity/flights.entity'; // Adjust the import path as necessary

@Module({
  imports: [TypeOrmModule.forFeature([Flight])],
  providers: [FlightsService],
  controllers: [FlightsController]
})
export class FlightsModule {}
