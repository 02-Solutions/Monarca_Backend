import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservations.entity';
import { RequestsModule } from 'src/requests/requests.module';
import { GuardsModule } from 'src/guards/guards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), RequestsModule,
GuardsModule],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
