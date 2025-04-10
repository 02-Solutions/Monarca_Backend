import {
    Controller,
    Post,
    Body,
    Res,
    Get,
    Req,
    UseGuards,
  } from '@nestjs/common';
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
      return this.loginService.logIn(data, res);
    }
  }
  