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
import { RequestsDestination } from 'src/requests-destinations/entities/requests-destination.entity';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestsRepo: Repository<RequestEntity>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(data: CreateRequestDto) {
    //VALIDAR VALIDEZ DE CIUDADES

    const request = this.requestsRepo.create({
      id_user: '3c6fa565-d54f-4a86-9ee6-43ed6856bc72', //Lo obtendremos del session cookie despues
      ...data,
      requests_destinations: data.requests_destinations.map((destDto) => ({
        ...destDto,
      })),
    });

    return this.requestsRepo.save(request);
  }

  /* Para sacar el user id de la cookie */
  // async create(data: CreateRequestDto, userId: string): Promise<Request> {

  //   //VALIDAR VALIDEZ DE CIUDADES

  //   const request = this.requestsRepository.create({
  //     id_user: userId, // Para sacar el user id de la cookie
  //     ...data,
  //     requests_destinations: data.requests_destinations.map((destDto) => ({
  //       ...destDto
  //     })),
  //   });

  //   return this.requestsRepository.save(request);
  // }

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

  async update(id: string, dto: UpdateRequestDto): Promise<RequestEntity> {
    const entity = await this.requestsRepo.findOne({
      where: { id },
      relations: ['requests_destinations'],
    });
    if (!entity) throw new NotFoundException(`Request ${id} not found`);

    if (dto.motive !== undefined) entity.motive = dto.motive;
    if (dto.priority !== undefined) entity.priority = dto.priority;
    if (dto.requirements !== undefined) entity.requirements = dto.requirements;
    if (dto.id_origin_city !== undefined)
      entity.id_origin_city = dto.id_origin_city;

    if (dto.requests_destinations) {
      entity.requests_destinations = dto.requests_destinations.map(
        (dtoDest) => {
          const dest = new RequestsDestination();
          if (dtoDest.id) dest.id = dtoDest.id;
          dest.id_request = entity.id;
          dest.request = entity;
          dest.id_destination = dtoDest.id_destination;
          dest.destination_order = dtoDest.destination_order;
          dest.stay_days = dtoDest.stay_days;
          dest.arrival_date = new Date(dtoDest.arrival_date);
          dest.departure_date = new Date(dtoDest.departure_date);
          dest.is_hotel_required =
            dtoDest.is_hotel_required ?? dest.is_hotel_required;
          dest.is_plane_required =
            dtoDest.is_plane_required ?? dest.is_plane_required;
          dest.is_last_destination =
            dtoDest.is_last_destination ?? dest.is_last_destination;
          dest.details = dtoDest.details ?? '';
          return dest;
        },
      );
    }

    return this.requestsRepo.save(entity);
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
