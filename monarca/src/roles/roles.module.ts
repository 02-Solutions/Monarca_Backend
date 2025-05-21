import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entity/roles.entity';
import { Permission } from './entity/permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, Permission])],
  providers: [],
  exports: [],
})
export class RolesModule {}
