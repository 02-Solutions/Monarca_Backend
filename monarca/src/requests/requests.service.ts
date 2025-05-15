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
import { Repository, In } from 'typeorm';
import { Request as RequestEntity } from './entities/request.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { UserChecks } from 'src/users/user.checks.service';
import { DestinationsChecks } from 'src/destinations/destinations.checks';
import { RequestInterface } from 'src/guards/interfaces/request.interface';
import { RequestsChecks } from './requests.checks';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestsRepo: Repository<RequestEntity>,
    private readonly userChecks: UserChecks,
    private readonly destinationChecks: DestinationsChecks,
    private readonly requestsChecks: RequestsChecks,
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
    const adminID = await this.userChecks.getRandomApproverID();

    if (!adminID) {
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

  async findAll(): Promise<RequestEntity[]> {
    return this.requestsRepo.find();
  }

  async findOne(req: RequestInterface, id: string): Promise<RequestEntity> {
    const userId = req.sessionInfo.id;

    const request = await this.requestsRepo.findOne({
      where: { id },
      relations: ['requests_destinations', 'revisions'],
    });
    if (!request) throw new NotFoundException(`Request ${id} not found`);

    // VALIDAR QUE PUEDE ACCEDER REQUEST
    if (userId !== request.id_user && userId !== request.id_admin)
      throw new UnauthorizedException('Cannot access this request.');

    return request;
  }

  async findByUser(userId: string): Promise<RequestEntity[]> {
    const list = await this.requestsRepo.find({ where: { id_user: userId } });
    return list;
  }

  async findByAdmin(userId: string): Promise<RequestEntity[]> {
    const list = await this.requestsRepo.find({ where: { id_admin: userId } });
    return list;
  }

  async update(id: string, data: UpdateRequestDto) {
    return 'ok';
    // await this.requestsRepo.update(id, data);
    // return await this.requestsRepo.findOne({
    //   where: { id },
    // });
  }

  async updateStatus(id: string, newStatus: string): Promise<RequestEntity> {
    const request = await this.requestsRepo.findOne({ where: { id } });

    if (!request) {
      throw new Error('Request not found');
    }
    request.status = newStatus;

    return await this.requestsRepo.save(request);
  }

  async remove(id: string): Promise<{ status: boolean; message: string }> {
    await this.requestsRepo.delete(id);
    return { status: true, message: `Request ${id} removed` };
  }
}
