import { Module } from '@nestjs/common';
import { RevisionsController } from './revisions.controller';
import { RevisionsService } from './revisions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revision } from './entities/revision.entity';
import { RequestsModule } from 'src/requests/requests.module';
import { GuardsModule } from 'src/guards/guards.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Revision]), NotificationsModule, UsersModule, RequestsModule, GuardsModule],
  controllers: [RevisionsController],
  providers: [RevisionsService],
})
export class RevisionsModule {}
