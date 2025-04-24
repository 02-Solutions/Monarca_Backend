import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsDestination } from './entities/requests-destination.entity';
import { RequestsDestinationsService } from './requests-destinations.service';
import { RequestsDestinationsController } from './requests-destinations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RequestsDestination])],
  controllers: [RequestsDestinationsController],
  providers: [RequestsDestinationsService],
  exports: [RequestsDestinationsService],
})
export class RequestsDestinationsModule {}
