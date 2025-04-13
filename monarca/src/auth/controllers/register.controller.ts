import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterDTO } from '../dto/register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  register(@Body() data: RegisterDTO) {
    return this.registerService.register(data);
  }
}
