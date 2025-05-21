import { Module } from '@nestjs/common';
import { JwtConfigModule } from 'src/jwt/jwt.config.module';
import { AuthGuard } from './auth.guard';
import { PermissionsGuard } from './permissions.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [JwtConfigModule, TypeOrmModule.forFeature([User])],
  providers: [AuthGuard, PermissionsGuard],
  exports: [
    AuthGuard,
    PermissionsGuard,
    JwtConfigModule,
    TypeOrmModule.forFeature([User]),
  ],
})
export class GuardsModule {}
