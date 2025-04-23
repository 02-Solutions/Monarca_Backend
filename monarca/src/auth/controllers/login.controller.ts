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
  import { AuthGuard } from 'src/guards/auth.guard';
  import { PermissionsGuard } from 'src/guards/permissions.guard';
  import { Permissions } from 'src/guards/decorators/permission.decorator';

  
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
        user: req.sessionInfo, // user from session
        cookie: req.headers.cookie || 'No cookie sent' // raw cookie header
      };
    }

    // Prueba de permiso de roles para las rutas con Guard
    @Get('roles2')
    @UseGuards(AuthGuard, PermissionsGuard)
    @Permissions(2)
    roleAcess2() {
      return 'Only users with permission ID 2 can access this';
    }

    @Get('roles3')
    @UseGuards(AuthGuard, PermissionsGuard)
    @Permissions(3)
    roleAcess3() {
      return 'Only users with permission ID 3 can access this';
    }
  }

  
  