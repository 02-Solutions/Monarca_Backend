import { Module } from '@nestjs/common';
import { TravelAgenciesService } from './travel-agencies.service';
import { TravelAgenciesController } from './travel-agencies.controller';

@Module({
  controllers: [TravelAgenciesController],
  providers: [TravelAgenciesService],
})
export class TravelAgenciesModule {}
