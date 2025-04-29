import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Destination])],
  providers: [DestinationsService],
  controllers: [DestinationsController],
  exports: [DestinationsService],
})
export class DestinationsModule {}
