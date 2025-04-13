import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './decorators/permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissionsRequired = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );
    
    if (!permissionsRequired) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userId = request.sessionInfo.id;

    // Hacer query y conseguir los permisos 
    // de ese usuario y checar si tiene autorizacion.


    return true;
  }
}
