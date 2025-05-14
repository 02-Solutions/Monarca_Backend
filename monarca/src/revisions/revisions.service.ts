import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRevisionDto } from './dto/create-revision.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Revision } from './entities/revision.entity';

@Injectable()
export class RevisionsService {
  constructor(
    @InjectRepository(Revision)
    private readonly revisionRepository: Repository<Revision>,
  ) {}

  async getRequestRevisions(id: string) {
    const request = await this.revisionRepository.find({
      where: { id_request: id },
    });

    if (!request) {
      throw new NotFoundException(`Request with id ${id} not found`);
    }

    return request;
  }

  async create(data: CreateRevisionDto) {
    const revision = this.revisionRepository.create({
      ...data,
      id_user: '3c6fa565-d54f-4a86-9ee6-43ed6856bc72', // OBTENER DEL COOKIE
    });


    // const revision = this.revisionRepository.create(data);
    return await this.revisionRepository.save(revision);
  }

}
