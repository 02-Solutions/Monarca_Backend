import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';
import { DestinationsChecks } from './destinations.checks';

@Module({
  imports: [TypeOrmModule.forFeature([Destination])],
  providers: [DestinationsService, DestinationsChecks],
  controllers: [DestinationsController],
  exports: [DestinationsChecks],
})
export class DestinationsModule {}
