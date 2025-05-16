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
    private readonly userRepository: Repository<User>,
  ) {}

  async logIn(data: LogInDTO): Promise<User | null> {
    const user = await this.userRepository.findOne({
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

    return user;
  }
  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      select: ['id', 'name', 'email', 'department', 'last_name', 'role'],
      relations: ['department', 'role', 'role.permissions'],
    });

    if (!user) {
      console.log('User not found');
      return null;
    }

    return user;
  }

  async getRandomApproverID(): Promise<string | null> {
    const approvers = await this.userRepository.find({
      where: {
        role: {
          name: 'Aprobador',
        },
      },
      select: ['id'],
      relations: [],
    });

    // console.log(approvers)

    if (approvers.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * approvers.length);

    return approvers[randomIndex].id;
  }

  async getRandomSOIID(): Promise<string | null> {
    const SOIs = await this.userRepository.find({
      where: {
        role: {
          name: 'SOI',
        },
      },
      select: ['id'],
      relations: [],
    });

    // console.log(approvers)

    if (SOIs.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * SOIs.length);

    return SOIs[randomIndex].id;
  }
}
