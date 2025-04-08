import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TravelAgenciesModule } from './travel-agencies/travel-agencies.module';

@Module({
  imports: [AuthModule, UsersModule, TravelAgenciesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
