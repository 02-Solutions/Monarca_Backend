import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from './departments/departments.module';
import { User } from './users/entities/user.entity';
import { Department } from './departments/entity/department.entity';
import { Request } from './requests/entities/request.entity';
import { RequestsDestination } from './requests-destinations/entities/requests-destination.entity';
import { RequestLog } from './request-logs/entities/request-log.entity';
import { TravelAgenciesModule } from './travel-agencies/travel-agencies.module';
import { RequestsModule } from './requests/requests.module';
import { RequestsDestinationsModule } from './requests-destinations/requests-destinations.module';
import { RequestLogsModule } from './request-logs/request-logs.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TravelAgenciesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT
        ? parseInt(process.env.POSTGRES_PORT, 10)
        : 5433,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Department, Request, RequestsDestination, RequestLog],
      synchronize: true,
    }),
    DepartmentsModule,
    RequestsModule,
    RequestsDestinationsModule,
    RequestLogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
