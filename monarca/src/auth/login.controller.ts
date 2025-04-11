import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { LogInDTO } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async logIn(
    @Body() data: LogInDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('Login data in login.controller:', data);
    return this.loginService.logIn(data, res);
  }
}
