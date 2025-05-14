import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Request as RequestEntity } from './entities/request.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';
import { UserChecks } from 'src/users/user.checks.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestsRepo: Repository<RequestEntity>,
    private readonly userChecks: UserChecks,
  ) {}


  async create(userId: string, data: CreateRequestDto) {
    //VALIDAR VALIDEZ DE CIUDADES
    

    //ASIGNAR APROVADOR
    const adminID = await this.userChecks.getRandomApproverID();

    if (!adminID)
    {
      throw new HttpException(
        'There is no admin available to assign the request.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const request = this.requestsRepo.create({
      id_user: userId,
      id_admin: adminID,

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
    // VALIDAR QUE PUEDE ACCEDER REQUEST

    const req = await this.requestsRepo.findOne({
      where: { id },
      relations: ['requests_destinations', 'revisions'],
    });
    console.log(req);

    if (!req) throw new NotFoundException(`Request ${id} not found`);
    return req;
  }

  async findByUser(userId: string): Promise<RequestEntity[]> {
    const list = await this.requestsRepo.find({ where: { id_user: userId } });
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
