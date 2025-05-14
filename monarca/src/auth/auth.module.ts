import { Module, forwardRef } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { JwtConfigModule } from 'src/jwt/jwt.config.module';
import { UsersModule } from 'src/users/users.module';
import { RegisterController } from './controllers/register.controller';
import { RegisterService } from './services/register.service';

@Module({
  imports: [JwtConfigModule, UsersModule],
  controllers: [LoginController, RegisterController],
  providers: [LoginService, RegisterService],
  exports: [LoginService, RegisterService, JwtConfigModule],
})
export class AuthModule {}
