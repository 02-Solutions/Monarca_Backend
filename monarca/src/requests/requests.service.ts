import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { Request as RequestEntity } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { UserChecks } from 'src/users/user.checks.service';
import { DestinationsChecks } from 'src/destinations/destinations.checks';
import { RequestInterface } from 'src/guards/interfaces/request.interface';
import { RequestsDestination } from './entities/requests-destination.entity';
import { RequestLog } from 'src/request-logs/entities/request-log.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestsRepo: Repository<RequestEntity>,
    private readonly userChecks: UserChecks,
    private readonly destinationChecks: DestinationsChecks,
    private readonly dataSource: DataSource,
  ) {}

  private async getCityName(id: string): Promise<string> {
    return await this.destinationChecks.getCityNameById(id);
  }

  private async logRequestAction(
    manager: EntityManager,
    id_request: string,
    id_user: string,
    action: 'create' | 'update' | 'status_change',
    new_status: string,
    extraData?: Record<string, any>,
  ) {
    let report: string;

    switch (action) {
      case 'create':
        report = `Solicitud creada con origen en la ciudad ${extraData?.originCity} y ${extraData?.numDestinations} destino(s).`;
        break;
      case 'update':
        report = `Solicitud actualizada. Se modificaron campos como motivo, ciudad de origen o destinos.`;
        break;
      case 'status_change':
        report = `El estado cambió de '${extraData?.fromStatus}' a '${new_status}'.`;
        break;
      default:
        report = 'Acción realizada en la solicitud.';
    }

    await manager.save(RequestLog, {
      id_request,
      id_user,
      report,
      new_status,
    });
  }

  async create(req: RequestInterface, data: CreateRequestDto) {
    const userId = req.sessionInfo.id;
    //VALIDAR VALIDEZ DE CIUDADES
    if (!(await this.destinationChecks.isValid(data.id_origin_city))) {
      throw new BadRequestException('Invalid id_origin_city.');
    }

    for (const rd of data.requests_destinations) {
      if (!(await this.destinationChecks.isValid(rd.id_destination)))
        throw new BadRequestException('Invalid id_destination.');
    }

    //ASIGNAR APROVADOR
    const id_department = req.userInfo.id_department;
    const adminId = await this.userChecks.getRandomApproverIdFromSameDepartment(
      id_department,
      userId,
    );
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
      ...data,
      requests_destinations: data.requests_destinations.map((destDto) => ({
        ...destDto,
      })),
    });

    const saved = await this.requestsRepo.save(request);

    // Log creación de un request
    const originCityName = await this.getCityName(saved.id_origin_city);
    await this.logRequestAction(
      this.dataSource.createEntityManager(),
      saved.id,
      saved.id_user,
      'create',
      saved.status,
      {
        originCity: originCityName,
        numDestinations: saved.requests_destinations.length,
      },
    );

    return saved;
  }

  async findAll(): Promise<RequestEntity[]> {
    return this.requestsRepo.find({
      relations: [
        'requests_destinations',
        'requests_destinations.destination',
        'revisions',
        'user',
        'admin',
        'SOI',
        'destination',
        'travel_agency',
        'travel_agency.users',
      ],
    });
  }

  async findOne(req: RequestInterface, id: string): Promise<RequestEntity> {
    const userId = req.sessionInfo.id;

    const request = await this.requestsRepo.findOne({
      where: { id },
      relations: [
        'requests_destinations',
        'requests_destinations.destination',
        'revisions',
        'user',
        'admin',
        'SOI',
        'destination',
        'vouchers',
      ],
    });
    if (!request) throw new NotFoundException(`Request ${id} not found`);

    // VALIDAR QUE PUEDE ACCEDER REQUEST
    const id_travel_agency = req.userInfo.id_travel_agency;

    if (
      userId !== request.id_user &&
      userId !== request.id_admin &&
      userId !== request.id_SOI &&
      !(id_travel_agency && id_travel_agency === request.id_travel_agency) //Testear mas
    )
      throw new UnauthorizedException('Cannot access this request.');

    return request;
  }

  async findByUser(req: RequestInterface): Promise<RequestEntity[]> {
    const userId = req.sessionInfo.id;
    const list = await this.requestsRepo.find({
      where: { id_user: userId },
      relations: [
        'requests_destinations',
        'requests_destinations.destination',
        'revisions',
        'user',
        'admin',
        'SOI',
        'destination',
      ],
    });
    return list;
  }

  async findByAdmin(req: RequestInterface): Promise<RequestEntity[]> {
    const userId = req.sessionInfo.id;
    const list = await this.requestsRepo.find({ 
      where: { id_admin: userId, status: "Pending Review" },
      relations: ['requests_destinations', 'requests_destinations.destination', 'revisions', 'user', 'user.department', 'user.department.cost_center','admin', 'SOI', 'destination'],
    });
    return list;
  }

  async findBySOI(req: RequestInterface): Promise<RequestEntity[]> {
    const userId = req.sessionInfo.id;
    const list = await this.requestsRepo.find({
      where: { id_SOI: userId },
      relations: [
        'requests_destinations',
        'requests_destinations.destination',
        'revisions',
        'user',
        'admin',
        'SOI',
        'destination',
      ],
    });
    return list;
  }

  // Para jalar todos los requests en estatus de Pending Refund Approval asignados a un SOI
  async findPendingRefundApproval(req: RequestInterface): Promise<RequestEntity[]> {
    const userId = req.sessionInfo.id;
    const list = await this.requestsRepo.find({
      where: { 
        status: 'Pending Refund Approval',
        id_SOI: userId
      },
      relations: [
        'requests_destinations',
        'requests_destinations.destination',
        'revisions',
        'user',
        'admin',
        'SOI',
        'destination',
      ],
    });
    return list;
  }

  async findByTA(req: RequestInterface): Promise<RequestEntity[]> {
    const userId = req.sessionInfo.id;
    const travelAgencyId = req.userInfo.id_travel_agency;

    if (!travelAgencyId)
      throw new UnauthorizedException('Cannot access this endpoint.');

    const list = await this.requestsRepo.find({
      where: {
        id_travel_agency: travelAgencyId,
        status: 'Pending Reservations',
      },
      relations: [
        'requests_destinations',
        'requests_destinations.destination',
        'revisions',
        'user',
        'admin',
        'SOI',
        'destination',
      ],
    });
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
      if (
        entity.status !== 'Pending Review' &&
        entity.status !== 'Changes Needed'
      )
        throw new ConflictException(
          'Unable to edit this request beacuse of its current status.',
        );

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
      entity.status = 'Pending Review';

      const updated = await repo.save(entity);

      // Log de actualización
      await this.logRequestAction(
        manager,
        updated.id,
        updated.id_user,
        'update',
        updated.status,
      );

      return updated;
    });
  }

  async updateStatus(id: string, newStatus: string): Promise<RequestEntity> {
    const request = await this.requestsRepo.findOne({ where: { id } });

    if (!request) {
      throw new Error('Request not found');
    }
    const previousStatus = request.status;
    request.status = newStatus;

    const updated = await this.requestsRepo.save(request);

    // Log de cambio de estado
    await this.logRequestAction(
      this.dataSource.createEntityManager(),
      updated.id,
      updated.id_user,
      'status_change',
      newStatus,
      { fromStatus: previousStatus },
    );

    return updated;
  }
}