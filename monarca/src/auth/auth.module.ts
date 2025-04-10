import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtConfigModule } from 'src/jwt/jwt.config.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [JwtConfigModule, UsersModule]
})
export class AuthModule {}
