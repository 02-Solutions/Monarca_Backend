import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Request as RequestEntity } from './entities/request.entity';
import { RequestInterface } from 'src/guards/interfaces/request.interface';
import { RequestsService } from './requests.service';
import { ApproveRequestDTO } from './dto/approve-request.dto';
import { TravelAgenciesChecks } from 'src/travel-agencies/travel-agencies.checks';

// STATUSES:
// ['Pending Review', 'Changes Needed', 'Denied', 'Cancelled', 'Pending Reservations',  'Pending Accounting Approval', 'In Progress',  'Pending Vouchers Approval', 'Completed]

@Injectable()
export class RequestsStatusService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestsRepo: Repository<RequestEntity>,
    private readonly requestsService: RequestsService,
    private readonly travelAgenciesChecks: TravelAgenciesChecks,
  ) {}

  async approve(
    req: RequestInterface,
    id_request: string,
    data: ApproveRequestDTO,
  ) {
    const id_user = req.sessionInfo.id;
    const id_travel_agency = data.id_travel_agency;
    const request = await this.requestsRepo.findOne({
      where: { id: id_request },
    });

    if (!request) throw new NotFoundException('Invalid request id');

    //CHECAR SI ES VALIDO EL TRAVEL AGENCY ID
    if (!(await this.travelAgenciesChecks.Exists(id_travel_agency)))
      throw new BadRequestException('Invalid travel agency id.');

    if (request.id_admin !== id_user)
      throw new UnauthorizedException('Unable to approve request.');

    if (request.status !== 'Pending Review')
      throw new ConflictException(
        'Unable to approve because of the requests current status.',
      );

    await this.requestsRepo.update(
      { id: id_request },
      { id_travel_agency: id_travel_agency },
    );
    return await this.requestsService.updateStatus(
      id_request,
      'Pending Reservations',
    );
  }

  async deny(req: RequestInterface, id_request: string) {
    const id_user = req.sessionInfo.id;
    const request = await this.requestsRepo.findOne({
      where: { id: id_request },
    });

    if (!request) throw new NotFoundException('Invalid request id');

    if (request.id_admin !== id_user)
      throw new UnauthorizedException('Unable to deny request.');

    if (request.status !== 'Pending Review')
      throw new ConflictException(
        'Unable to deny because of the requests current status.',
      );

    return await this.requestsService.updateStatus(id_request, 'Denied');
  }

  async cancel(req: RequestInterface, id_request: string) {
    const id_user = req.sessionInfo.id;
    const request = await this.requestsRepo.findOne({
      where: { id: id_request },
    });

    if (!request) throw new NotFoundException('Invalid request id');

    if (request.id_user !== id_user)
      throw new UnauthorizedException('Unable to cancel request.');

    if (
      request.status !== 'Pending Review' &&
      request.status !== 'Changes Needed'
    )
      throw new ConflictException(
        'Unable to cancel because of the requests current status.',
      );

    return await this.requestsService.updateStatus(id_request, 'Cancelled');
  }

  async finishedReservations(req: RequestInterface, id_request: string) {
    const id_travel_agency = req.userInfo.id_travel_agency;

    const request = await this.requestsRepo.findOne({
      where: { id: id_request },
    });

    if (!request) throw new NotFoundException('Invalid request id');

    
    // console.log("Scenario 1: ")
    // console.log (`(!(id_travel_agency && id_travel_agency === request.id_travel_agency)) ${(!(id_travel_agency && id_travel_agency === request.id_travel_agency))}`)
    // console.log("Scenario 2: ")
    // console.log (` (!!id_travel_agency && id_travel_agency !== request.id_travel_agency) ${ (!!id_travel_agency && id_travel_agency !== request.id_travel_agency)}`)
    
    if  (!(id_travel_agency && id_travel_agency === request.id_travel_agency)) //Testear mas
      throw new UnauthorizedException('Unable to change requests status.')

    if (request.status !== 'Pending Reservations')
      throw new ConflictException(
        'Unable to change status because of the requests current status.',
      );

    return await this.requestsService.updateStatus(
      id_request,
      'Pending Accounting Approval',
    );
  }

  async SOIApproval(req: RequestInterface, id_request: string) {
    const id_user = req.sessionInfo.id;
    const request = await this.requestsRepo.findOne({
      where: { id: id_request },
    });

    if (!request) throw new NotFoundException('Invalid request id');


    if (request.id_SOI !== id_user)
      throw new UnauthorizedException('Unable to approve request.');

    if (request.status !== 'Pending Accounting Approval')
      throw new ConflictException(
        'Unable to change status because of the requests current status.',
      );

    return await this.requestsService.updateStatus(id_request, 'In Progress');
  }

  async finishedUploadingVouchers(req: RequestInterface, id_request: string) {
    const id_user = req.sessionInfo.id;
    const request = await this.requestsRepo.findOne({
      where: { id: id_request },
    });

    if (!request) throw new NotFoundException('Invalid request id');

    if (request.id_user !== id_user)
      throw new UnauthorizedException('Unable to change status on request.');

    if (request.status !== 'In Progress')
      throw new ConflictException(
        'Unable to change status because of the requests current status.',
      );

    return await this.requestsService.updateStatus(
      id_request,
      'Pending Vouchers Approval',
    );
  }

  // Se cambia el estatus final de Completed a Pending Refund Approval
  async finishedApprovingVouchers(req: RequestInterface, id_request: string) {
    const id_user = req.sessionInfo.id;
    const request = await this.requestsRepo.findOne({
      where: { id: id_request },
    });

    if (!request) throw new NotFoundException('Invalid request id');

    if (request.id_admin !== id_user)
      throw new UnauthorizedException('Unable to change status on request.');

    if (request.status !== 'Pending Vouchers Approval')
      throw new ConflictException(
        'Unable to change status because of the requests current status.',
      );

    return await this.requestsService.updateStatus(id_request, 'Pending Refund Approval');
  }

  //finsihedRegisteringRequest
  async finsihedRegisteringRequest(req: RequestInterface, id_request: string) {
    const id_user = req.sessionInfo.id;
    const request = await this.requestsRepo.findOne({
      where: { id: id_request },
    });

    if (!request) throw new NotFoundException('Invalid request id');

    if (request.id_admin !== id_user)
      throw new UnauthorizedException('Unable to change status on request.');

    if (request.status !== 'Pending Refund Approval')
      throw new ConflictException(
        'Unable to change status because of the requests current status.',
      );

    return await this.requestsService.updateStatus(id_request, 'Completed');
  }
}
