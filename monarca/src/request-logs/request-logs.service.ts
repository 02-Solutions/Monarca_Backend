import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestLogDto } from './dto/create-request-log.dto';
import { UpdateRequestLogDto } from './dto/update-request-log.dto';
import { RequestLog } from './entities/request-log.entity';

@Injectable()
export class RequestLogsService {
  constructor(
    @InjectRepository(RequestLog)
    private readonly repo: Repository<RequestLog>,
  ) {}

  async create(data: CreateRequestLogDto): Promise<RequestLog> {
    const ent = this.repo.create(data);
    return this.repo.save(ent);
  }

  async findAll(): Promise<RequestLog[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<RequestLog> {
    const ent = await this.repo.findOneBy({ id });
    if (!ent) throw new NotFoundException(`Log ${id} not found`);
    return ent;
  }

  async update(id: string, data: UpdateRequestLogDto): Promise<RequestLog> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ status: boolean; message: string }> {
    await this.repo.delete(id);
    return { status: true, message: `Log ${id} removed` };
  }
}
