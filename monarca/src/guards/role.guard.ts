import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userServices: UsersService, // to query role
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!requiredRoles) {
      return true;  // No roles specified = public for any authenticated user
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.sessionInfo.id;

    const user = await this.userServices.findById(userId); // Query role from DB
    console.log('DEBUG → User:', user);
    console.log('DEBUG → Role:', user.role);
    console.log('DEBUG → Role name:', user.role.name);
    
    if (!user) {
        throw new ForbiddenException('User not found');
      }

      if (!requiredRoles.includes(user.role.name)) {
        throw new ForbiddenException('You do not have permission');
      }
  
    return true;
  }
}
