import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

interface SessionInfo {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request & {
      sessionInfo: SessionInfo;
    };

    const token = request.cookies['sessionInfo'];
    //console.log('TOKEN:', token);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.sessionInfo = payload; // Attach user to the request
      // console.log(request);
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
