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
  import { LogInDTO } from '../dto/login.dto';
  import { LoginService } from '../services/login.service';
  import { RegisterDTO } from '../dto/register.dto';
  import { AuthGuard } from 'src/guards/auth.guard';
  import { RolesGuard } from 'src/guards/role.guard';
  import { Roles } from 'src/guards/decorators/role.decorator';

  
  @Controller('login')
  export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    logIn(
      @Body() data: LogInDTO,
      @Res({ passthrough: true }) res: Response,
    ) {
      return this.loginService.logIn(data, res);
    }

    // Prueba de envio de cookies y el usuario que ingreso
    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Req() req: any, @Res({ passthrough: true }) res: Response) {
      return {
        message: 'Prueba de envio de cookies y el usuario que ingreso',
        user: req.sessionInfo, // ✅ user from session
        cookie: req.headers.cookie || 'No cookie sent' // ✅ raw cookie header
      };
    }

    // Prueba de roles para las rutas con Guard
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @Get('admin')
    getAdminData() {
      return 'Only Admin can see this';
    }
  }

  
  