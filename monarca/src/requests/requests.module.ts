import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { RequestsDestination } from 'src/requests/entities/requests-destination.entity';
import { GuardsModule } from 'src/guards/guards.module';
import { UsersModule } from 'src/users/users.module';
import { DestinationsModule } from 'src/destinations/destinations.module';
import { RequestsChecks } from './requests.checks';
import { RequestsStatusController } from './requests.status.controller';
import { RequestsStatusService } from './requests.status.service';
import { TravelAgenciesChecks } from 'src/travel-agencies/travel-agencies.checks';
import { TravelAgenciesModule } from 'src/travel-agencies/travel-agencies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request, RequestsDestination]),
    GuardsModule,
    UsersModule,
    DestinationsModule,
    TravelAgenciesModule,
  ],
  controllers: [RequestsController, RequestsStatusController],
  providers: [RequestsService, RequestsChecks, RequestsStatusService],
  exports: [RequestsService, RequestsChecks],
})
export class RequestsModule {}