import { Module } from '@nestjs/common';
import { TravelAgenciesService } from './travel-agencies.service';
import { TravelAgenciesController } from './travel-agencies.controller';
import { TravelAgency } from './entities/travel-agency.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TravelAgency])],
  controllers: [TravelAgenciesController],
  providers: [TravelAgenciesService],
  exports: [TravelAgenciesService],
})
export class TravelAgenciesModule {}
