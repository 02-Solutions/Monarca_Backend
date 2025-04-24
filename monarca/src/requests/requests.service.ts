import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestsRepository: Repository<Request>,
  ) {}

  async create(data: CreateRequestDto): Promise<Request> {
    const request = this.requestsRepository.create(data);
    return this.requestsRepository.save(request);
  }

  async findAll(): Promise<Request[]> {
    return this.requestsRepository.find();
  }

  async findOne(id: string): Promise<Request> {
    const request = await this.requestsRepository.findOneBy({ id });
    if (!request) {
      throw new NotFoundException(`Request ${id} not found`);
    }
    return request;
  }

  async update(id: string, data: UpdateRequestDto): Promise<Request> {
    await this.requestsRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ status: boolean; message: string }> {
    await this.requestsRepository.delete(id);
    return { status: true, message: `Request ${id} removed` };
  }
}
