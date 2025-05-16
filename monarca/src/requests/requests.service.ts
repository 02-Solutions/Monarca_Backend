<<<<<<< HEAD
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Request as RequestEntity } from './entities/request.entity';
=======
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DataSource } from 'typeorm';
import { Request as RequestEntity } from './entities/request.entity';
import { User } from 'src/users/entities/user.entity';
>>>>>>> 673dd0f2baf47d9d29d52167ebb79ebd91283544
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { UserChecks } from 'src/users/user.checks.service';
import { DestinationsChecks } from 'src/destinations/destinations.checks';
import { RequestInterface } from 'src/guards/interfaces/request.interface';
import { RequestsChecks } from './requests.checks';
import { RequestsDestination } from './entities/requests-destination.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestsRepo: Repository<RequestEntity>,
<<<<<<< HEAD
  ) {}

  async create(data: CreateRequestDto): Promise<RequestEntity> {
    const newRequest = this.requestsRepo.create({
      id_user: 'test123',
=======
    private readonly userChecks: UserChecks,
    private readonly destinationChecks: DestinationsChecks,
    private readonly requestsChecks: RequestsChecks,
    private readonly dataSource: DataSource,
  ) {}

  async create(userId: string, data: CreateRequestDto) {
    //VALIDAR VALIDEZ DE CIUDADES
    if (!(await this.destinationChecks.isValid(data.id_origin_city))) {
      throw new BadRequestException('Invalid id_origin_city.');
    }

    for (const rd of data.requests_destinations) {
      if (!(await this.destinationChecks.isValid(rd.id_destination)))
        throw new BadRequestException('Invalid id_destination.');
    }

    //ASIGNAR APROVADOR
    const adminId = await this.userChecks.getRandomApproverID();
    if (!adminId) {
      throw new HttpException(
        'There is no admin available to assign the request.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    //ASIGNAR SOI
    const SOIId = await this.userChecks.getRandomSOIID();
    if (!SOIId) {
      throw new HttpException(
        'There is no SOI available to assign the request.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const request = this.requestsRepo.create({
      id_user: userId,
      id_admin: adminId,
      id_SOI: SOIId,
>>>>>>> 673dd0f2baf47d9d29d52167ebb79ebd91283544
      ...data,
      requests_destinations: data.requests_destinations.map((destDto) => ({
        ...destDto,
      })),
    });
    return this.requestsRepo.save(newRequest);
  }

  async findAll(): Promise<RequestEntity[]> {
    return this.requestsRepo.find();
  }

<<<<<<< HEAD
  async findOne(id: string): Promise<RequestEntity> {
    const found = await this.requestsRepo.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Request ${id} not found`);
    }
    return found;
=======
  async findOne(req: RequestInterface, id: string): Promise<RequestEntity> {
    const userId = req.sessionInfo.id;

    const request = await this.requestsRepo.findOne({
      where: { id },
      relations: ['requests_destinations', 'revisions'],
    });
    if (!request) throw new NotFoundException(`Request ${id} not found`);

    // VALIDAR QUE PUEDE ACCEDER REQUEST
    if (userId !== request.id_user && userId !== request.id_admin  && userId !== request.id_SOI)
      throw new UnauthorizedException('Cannot access this request.');

    return request;
>>>>>>> 673dd0f2baf47d9d29d52167ebb79ebd91283544
  }

  async findByUser(userId: string): Promise<RequestEntity[]> {
    const list = await this.requestsRepo.find({ where: { id_user: userId } });
<<<<<<< HEAD
    if (list.length === 0) {
      throw new NotFoundException(`No requests found for user ${userId}`);
    }
=======
>>>>>>> 673dd0f2baf47d9d29d52167ebb79ebd91283544
    return list;
  }

  async findByAdmin(userId: string): Promise<RequestEntity[]> {
    const list = await this.requestsRepo.find({ where: { id_admin: userId } });
    return list;
  }

  async findBySOI(userId: string): Promise<RequestEntity[]> {
    const list = await this.requestsRepo.find({ where: { id_SOI: userId } });
    return list;
  }

  async updateRequest(
    req: RequestInterface,
    id: string,
    data: UpdateRequestDto,
  ) {
    //Crea un transaction, entonces en caso de un error hay rollback automatico
    return await this.dataSource.transaction(async (manager) => {
      const repo = manager.withRepository(this.requestsRepo);

      const entity = await repo.findOne({
        where: { id },
        relations: ['requests_destinations'],
      });
      if (!entity) throw new NotFoundException(`Request ${id} not found`);

      if (req.sessionInfo.id !== entity.id_user)
        throw new UnauthorizedException('Unable to edit this request.');

      //Un request solo puede ser editado si esta en estos estados
      if (entity.status !== "Pending Review" && entity.status !== "Changes Needed")
        throw new ConflictException('Unable to edit this request beacuse of its current status.');

      //VALIDAR VALIDEZ DE CIUDADES
      if (!(await this.destinationChecks.isValid(data.id_origin_city))) {
        throw new BadRequestException('Invalid id_origin_city.');
      }

      for (const rd of data.requests_destinations) {
        if (!(await this.destinationChecks.isValid(rd.id_destination)))
          throw new BadRequestException('Invalid id_destination.');
      }

      //Update informacion general
      entity.advance_money = data.advance_money;
      entity.id_origin_city = data.id_origin_city;
      entity.motive = data.motive;
      entity.requirements = data.requirements;
      entity.priority = data.priority;

      //Overhaul de requests_destinations
      const destRepo = manager.getRepository(RequestsDestination);
      entity.requests_destinations = data.requests_destinations.map((d) =>
        destRepo.create({ ...d }),
      );
      
      //Update status
      entity.status = "Pending Review";

      return await repo.save(entity); // single round-trip
    });
  }

  async updateStatus(id: string, newStatus: string): Promise<RequestEntity> {
    const request = await this.requestsRepo.findOne({ where: { id } });

    if (!request) {
      throw new Error('Request not found');
    }
    request.status = newStatus;

    return await this.requestsRepo.save(request);
  }


}
