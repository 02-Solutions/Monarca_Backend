import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserChecks } from './user.checks.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DepartmentsModule } from 'src/departments/departments.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    DepartmentsModule,
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [UserChecks, UsersService],
  exports: [UserChecks, UsersService],
})
export class UsersModule {}
