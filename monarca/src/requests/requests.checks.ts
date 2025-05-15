import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Request as RequestEntity } from './entities/request.entity';

@Injectable()
export class RequestsChecks {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestsRepo: Repository<RequestEntity>,
  ) {}

  async isRequestsAdmin(id_request: string, id_user: string) {
    const request = await this.requestsRepo.findOne({
      where: { id_admin: id_user, id: id_request },
      relations: [],
    });

    return !!request;
  }

  async Exists(id_request: string) {
    const request = await this.requestsRepo.findOne({
      where: { id: id_request },
    });

    return !!request;
  }
}
