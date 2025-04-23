import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './decorators/permission.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissionsRequired = this.reflector.get<number[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );

    if (!permissionsRequired) return true;

    const request = context.switchToHttp().getRequest();
    const userId = request.sessionInfo.id;

    const user = await this.usersService.findById(userId); // includes role & permissions
    if (!user) throw new ForbiddenException('User not found');

    console.log('User found:', user);
    console.log('User permissions:', user.role?.permissions);

    const permissionIds = user.role?.permissions.map(p => p.id) || [];

    const hasPermission = permissionsRequired.every(p => permissionIds.includes(p));
    if (!hasPermission) throw new ForbiddenException('Permission denied');

    return true;
  }
}
