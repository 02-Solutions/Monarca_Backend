import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from './departments/departments.module';
import { User } from './users/entity/user.entity';
import { Department } from './departments/entity/department.entity';
import { TravelAgenciesModule } from './travel-agencies/travel-agencies.module';
import { FlightsModule } from './flights/flights.module';


@Module({
  imports: [AuthModule, UsersModule, TravelAgenciesModule,FlightsModule,
     TypeOrmModule.forRoot({
        type: 'postgres', 
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT
             ? parseInt(process.env.POSTGRES_PORT, 10)
             : 5433,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities: [User, Department], 
        synchronize: true, 
    }),
     DepartmentsModule,
     ],
  controllers: [],
  providers: [],
})
export class AppModule {}
