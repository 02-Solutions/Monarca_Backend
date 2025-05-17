import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/user.dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(private readonly userService: UsersService) {}

  // Registor de usuario
  async register(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    console.log('DEBUG → Registering user:', data);

    const newUser = await this.userService.create(data);

    const { password, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }
}
