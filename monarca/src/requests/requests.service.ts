import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Request as RequestEntity } from './entities/request.entity';
import { User } from 'src/users/entities/user.entity';

import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestsRepo: Repository<RequestEntity>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(data: CreateRequestDto): Promise<Request> {
    //VALIDAR VALIDEZ DE CIUDADES

    const request = this.requestsRepo.create({
      id_user: 'test123', //Lo obtendremos del session cookie despues
      ...data,
      requests_destinations: data.requests_destinations.map((destDto) => ({
        ...destDto,
      })),
    });

    return this.requestsRepo.save(request);
  }

  async findAll(): Promise<RequestEntity[]> {
    return this.requestsRepo.find();
  }

  async findOne(id: string): Promise<RequestEntity> {
    const req = await this.requestsRepo.findOneBy({ id });
    if (!req) throw new NotFoundException(`Request ${id} not found`);
    return req;
  }

  async findByUser(userId: string): Promise<RequestEntity[]> {
    const list = await this.requestsRepo.find({ where: { id_user: userId } });
    if (!list.length)
      throw new NotFoundException(`No requests found for user ${userId}`);
    return list;
  }

  async update(id: string, data: UpdateRequestDto): Promise<RequestEntity> {
    await this.requestsRepo.update(id, data);
    return this.findOne(id);
  }

  async updateStatus(
    id: string,
    data: UpdateRequestStatusDto,
  ): Promise<RequestEntity> {
    const req = await this.findOne(id);
    req.status = data.status;
    return this.requestsRepo.save(req);
  }

  async remove(id: string): Promise<{ status: boolean; message: string }> {
    await this.requestsRepo.delete(id);
    return { status: true, message: `Request ${id} removed` };
  }
}
