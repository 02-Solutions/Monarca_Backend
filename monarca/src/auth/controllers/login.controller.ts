import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { LogInDTO } from '../dto/login.dto';
import { LoginService } from '../services/login.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  logIn(@Body() data: LogInDTO, @Res({ passthrough: true }) res: Response) {
    return this.loginService.logIn(data, res);
  }
  @Post('logout')
  @HttpCode(200)
  logOut(@Res({ passthrough: true }) res: Response) {
    return this.loginService.logOut(res);
  }

  // Prueba de envio de cookies y el usuario que ingreso
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    return this.loginService.profile(req);
  }

  // YA NO USAR: BORRAR PRONTO
  // // Prueba de permiso de roles para las rutas con Guard
  // @Get('Eliminar')
  // @UseGuards(AuthGuard, PermissionsGuard)
  // @Permissions('Eliminar Datos')
  // roleAcess2() {
  //   return 'Only users with permission ID 2 can access this';
  // }

  // @Get('prueba_permisos')
  // @UseGuards(AuthGuard, PermissionsGuard)
  // @Permissions('Ver Reportes') // Acceso a los usuarios que tienes este permiso
  // permissionsTest(@Req() req) {

  //   // Permisos especificos
  //   const canDelete = hasPermission(req, 'Eliminar Datos');
  //   const canEdit = hasPermission(req, 'Editar Datos');

  //   let message = 'Tienes permisos de ver.';

  //   if (canDelete) {
  //     message += ' Tambien tienes permisos de eliminar.';
  //   }

  //   if (canEdit) {
  //     message += ' Tambien tienes permisos de editar.';
  //   }

  //   return {
  //     message,
  //     permissions: {
  //       canDelete,
  //       canEdit
  //     }
  //   };
  // }
}
