import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestLog } from './entities/request-log.entity';
import { RequestLogsService } from './request-logs.service';
import { RequestLogsController } from './request-logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RequestLog])],
  controllers: [RequestLogsController],
  providers: [RequestLogsService],
  exports: [TypeOrmModule, RequestLogsService],
})
export class RequestLogsModule {}
