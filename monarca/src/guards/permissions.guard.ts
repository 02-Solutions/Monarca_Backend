import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './decorators/permission.decorator';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionInfoInterface } from './interfaces/sessionInfo.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(User)
    private userRepository123: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<
      Request & {
        sessionInfo: SessionInfoInterface;
        userPermissions?: string[];
      }
    >();

    const userId = request.sessionInfo?.id;
    if (!userId) throw new ForbiddenException('User session not found');

    const user = await this.findById(userId);
    if (!user || !user.role || !user.role.permissions) {
      throw new ForbiddenException('User or permissions not found');
    }

    // console.log('User found:', user);

    request.sessionInfo.id = user.id;
    // console.log(`request.sessionInfo.id: ${request.sessionInfo.id}`)

    const userPermissions = user.role.permissions.map((p) => p.name);
    request.userPermissions = userPermissions;

    const permissionsRequired = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
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

  async findById(id: string): Promise<User> {
    const user = await this.userRepository123.findOne({
      where: { id },
      relations: ['role', 'role.permissions'],
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return user;
  }
}
