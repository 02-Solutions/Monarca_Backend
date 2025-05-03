import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
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
    
    const request = context.switchToHttp().getRequest<Request & {
      sessionInfo?: { id: string };
      userPermissions?: string[];
    }>();

    const userId = request.sessionInfo?.id;
    if (!userId) throw new ForbiddenException('User session not found');

    const user = await this.usersService.findById(userId);
    if (!user || !user.role || !user.role.permissions) {
      throw new ForbiddenException('User or permissions not found');
    }

    console.log('User found:', user);

    const userPermissions = user.role.permissions.map((p) => p.name);
    request.userPermissions = userPermissions;

    const permissionsRequired = this.reflector.get<string[]>(
      PERMISSIONS_KEY, 
      context.getHandler()
    );

    if (!permissionsRequired) return true;

    const hasPermission = permissionsRequired.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Permission denied');
    }

    return true;

  }
}
