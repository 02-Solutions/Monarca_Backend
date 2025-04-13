import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
    constructor(private readonly userServices: UsersService) {}
    
    // Registor de usuario
    async register(data: RegisterDTO) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        console.log('DEBUG → Registering user:', data);
      
        const newUser = await this.userServices.createUser({
          name: data.name,
          last_name: data.last_name,
          email: data.email,
          password: hashedPassword,
          id_department: 1,
          id_role: 1,
          status: 'active',
        });
      
        const { password, ...userWithoutPassword } = newUser;
      
        return userWithoutPassword;
      }
  }
  
