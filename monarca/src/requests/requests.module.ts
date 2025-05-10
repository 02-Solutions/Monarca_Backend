import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { RequestsDestination } from 'src/requests-destinations/entities/requests-destination.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Request, RequestsDestination]),
  NotificationsModule,  
  ],
  controllers: [RequestsController],  
  providers: [RequestsService],
  exports: [RequestsService],
})
export class RequestsModule {}
