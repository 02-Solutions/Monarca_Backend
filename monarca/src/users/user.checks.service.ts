import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { LogInDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class UserChecks {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async logIn(data: LogInDTO) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    console.log('DEBUG → Found user:', user);
    return user;
  }
}
