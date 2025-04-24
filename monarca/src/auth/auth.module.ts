import { Module, forwardRef} from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { JwtConfigModule } from 'src/jwt/jwt.config.module';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from 'src/guards/auth.guard';
import { RegisterController } from './controllers/register.controller';
import { RegisterService } from './services/register.service';
import { PermissionsGuard } from 'src/guards/permissions.guard';

@Module({
  imports: [
    JwtConfigModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [LoginController, RegisterController],
  providers: [LoginService, RegisterService, AuthGuard, PermissionsGuard],
  exports: [LoginService, RegisterService, AuthGuard, JwtConfigModule],
})
export class AuthModule {}