import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LogInDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class UserChecks {
  constructor(
    @InjectRepository(User)
    private readonly Userepository: Repository<User>,
  ) {}

  async logIn(data: LogInDTO): Promise<User | null> {
    console.log('Login data in user.checks.service:', data);

    const users = await this.Userepository.find();
    console.log('Users in user.checks.service:', users);

    const user = await this.Userepository.findOne({
      where: {
        email: data.email,
        password: data.password,
      },
    });

    console.log('User encontrado:', user);

    return user;
  }
}
