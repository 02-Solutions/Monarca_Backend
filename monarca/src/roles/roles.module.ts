import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesPermissions } from './entity/role.entity';
import { Permission } from './entity/permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesPermissions, Permission])],
  providers: [],
  exports: [],
})
export class RolesModule {}
