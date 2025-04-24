import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestsDestinationDto } from './dto/create-requests-destination.dto';
import { UpdateRequestsDestinationDto } from './dto/update-requests-destination.dto';
import { RequestsDestination } from './entities/requests-destination.entity';

@Injectable()
export class RequestsDestinationsService {
  constructor(
    @InjectRepository(RequestsDestination)
    private readonly repo: Repository<RequestsDestination>,
  ) {}

  async create(
    data: CreateRequestsDestinationDto,
  ): Promise<RequestsDestination> {
    const ent = this.repo.create(data);
    return this.repo.save(ent);
  }

  async findAll(): Promise<RequestsDestination[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<RequestsDestination> {
    const ent = await this.repo.findOneBy({ id });
    if (!ent) throw new NotFoundException(`Destination ${id} not found`);
    return ent;
  }

  async update(
    id: string,
    data: UpdateRequestsDestinationDto,
  ): Promise<RequestsDestination> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ status: boolean; message: string }> {
    await this.repo.delete(id);
    return { status: true, message: `Destination ${id} removed` };
  }
}
