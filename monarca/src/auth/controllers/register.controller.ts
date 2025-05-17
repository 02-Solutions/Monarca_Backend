import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { CreateUserDto } from 'src/users/dto/user.dtos';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  /*

  Ejemplo de body para el registro de usuario
  {
    "name": "",
    "last_name": "",
    "password": "",
    "email": ""
  }

  Para realizar el cambio del rol y departamento por ahora se debe de hacer el cambio en el codigo "register.service.ts"
  */

  @Post()
  register(@Body() data: CreateUserDto) {
    return this.registerService.register(data);
  }
}
