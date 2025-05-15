import { Module } from '@nestjs/common';
import { RevisionsController } from './revisions.controller';
import { RevisionsService } from './revisions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revision } from './entities/revision.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Revision])],
  controllers: [RevisionsController],
  providers: [RevisionsService],
})
export class RevisionsModule {}
