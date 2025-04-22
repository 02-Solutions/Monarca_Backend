import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { LogInDTO } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserChecks } from 'src/users/user.checks.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private readonly userChecks: UserChecks,
    private readonly jwtService: JwtService,
  ) {}

  async logIn(data: LogInDTO, res: Response) {
    const user = await this.userChecks.logIn(data);
  
    if (!user) {
      return { status: false, message: 'Email or password incorrect' };
    }
    
    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
  
    if (!isPasswordValid) {
      return { status: false, message: 'Email or password incorrect' };
    }
  
    const payload = { id: user.id };
    const token = this.jwtService.sign(payload);
    
    // Cambios para la conexion con el front
    res.cookie('sessionInfo', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 3600 * 1000, // 1 hour
    });
  
    return { status: true, message: 'Logged in successfully' };
  }
}
