import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LogInDTO } from 'src/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserChecks {
  constructor(
    @InjectRepository(User)
    private readonly Userepository: Repository<User>,
  ) {}

  async logIn(data: LogInDTO): Promise<User | null> {
    console.log('Login data in user.checks.service:', data);

    const user = await this.Userepository.findOne({
      where: { email: data.email },
      relations: ['department', 'role', 'role.permissions'],
    });

    if (!user) {
      console.log('Email or password incorrect');
      return null;
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      console.log('Password does not match');
      return null;
    }

    console.log('User encontrado:', user);
    console.log('User permissions:', user.role?.permissions);
    return user;
  }
  async getUserById(id: string): Promise<User | null> {
    const user = await this.Userepository.findOne({
      where: { id: id },
      select: ['id', 'name', 'email','department','last_name','role'],
      relations: ['department', 'role', 'role.permissions'],
    });

    if (!user) {
      console.log('User not found');
      return null;
    }

    return user;
  }
}
