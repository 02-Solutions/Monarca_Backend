import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogs } from './entity/user-logs.entity';
import { UserLogsService } from './user-logs.service';
import { UserLogsController } from './user-logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserLogs])],
  providers: [UserLogsService],
  controllers: [UserLogsController],
})
export class UserLogsModule {}
