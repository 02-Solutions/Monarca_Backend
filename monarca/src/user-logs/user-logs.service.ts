import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLogs } from './entity/user-logs.entity';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { UpdateUserLogDto } from './dto/update-user-log.dto';

@Injectable()
export class UserLogsService {
  constructor(
    @InjectRepository(UserLogs)
    private readonly userLogsRepository: Repository<UserLogs>,
  ) {}

  create(dto: CreateUserLogDto) {
    const log = this.userLogsRepository.create(dto);
    return this.userLogsRepository.save(log);
  }

  findAll() {
    return this.userLogsRepository.find();
  }

  findOne(id: number) {
    return this.userLogsRepository.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateUserLogDto) {
    return this.userLogsRepository.update(id, dto);
  }

  remove(id: number) {
    return this.userLogsRepository.delete(id);
  }
}
