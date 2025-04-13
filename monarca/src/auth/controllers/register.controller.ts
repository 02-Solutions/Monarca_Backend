import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterDTO } from '../dto/register.dto';

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
  */

  @Post()
  register(@Body() data: RegisterDTO) {
    return this.registerService.register(data);
  }
}
