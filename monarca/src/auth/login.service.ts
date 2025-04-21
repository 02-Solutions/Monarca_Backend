import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { LogInDTO } from './dto/login.dto';
// import { UserChecks } from 'src/users/user.checks.service';
import { JwtService } from '@nestjs/jwt';
import { UserChecks } from 'src/users/user.checks.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly userChecks: UserChecks,
    private readonly jwtService: JwtService,
  ) {}

  async logIn(data: LogInDTO, res: Response) {
    const user = await this.userChecks.logIn(data);

    if (!user) {
      return { status: false, message: 'Log in failed!' };
    }
    const payload = {
      id: user.id,
    };

    const token = this.jwtService.sign(payload);
    // console.log(token)
    res.cookie('sessionInfo', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 3600 * 1000, // 1 hour
    });

    return {
      status: true,
      message: 'Logged in successfully',
    };
  }
}
