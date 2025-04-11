import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request & {
      sessionInfo: { id: number;};
    };
    const token = request.cookies.jwt;
    // console.log(token);
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
