import { Module } from '@nestjs/common';
import { JwtConfigModule } from 'src/jwt/jwt.config.module';
import { AuthGuard } from './auth.guard';
import { PermissionsGuard } from './permissions.guard';

@Module({
  imports: [JwtConfigModule],
  providers: [AuthGuard, PermissionsGuard],
  exports: [AuthGuard, PermissionsGuard, JwtConfigModule],
})
export class GuardsModule {}
