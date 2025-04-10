import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { LogInDTO } from 'src/auth/dto/login.dto';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserChecks {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async logIn({username, password}) 
  {
    const user = await this.userRepository.findOne({
      where: {
        username,
        password,
      },
    });
    return user;
  }

 
}
