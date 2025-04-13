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

  Antes de registrar un usuario, se debe verificar si en la base de datos ya existe el rol y el departamento
  por default lo pueden registrar como:

  INSERT INTO roles (id, name) VALUES 
  (1, 'admin'),
  (2, 'user');

  INSERT INTO departments (id, name) VALUES 
  (1, 'IT'),
  (2, 'HR'),
  (3, 'Finance');

  Para realizar el cambio del rol y departamento por ahora se debe de hacer el cambio en el codigo "register.service.ts"
  */

  @Post()
  register(@Body() data: RegisterDTO) {
    return this.registerService.register(data);
  }
}
