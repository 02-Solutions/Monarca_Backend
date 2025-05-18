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
import { RequestsDestination } from './entities/requests-destination.entity';

@Injectable()
export class RequestsChecks {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestsRepo: Repository<RequestEntity>,
    @InjectRepository(RequestsDestination)
    private readonly requestsDestinationRepo: Repository<RequestsDestination>,
  ) {}

  async isRequestsAdmin(id_request: string, id_user: string) {
    const request = await this.requestsRepo.findOne({
      where: { id_admin: id_user, id: id_request },
      relations: [],
    });

    return !!request;
  }

  async requestExists(id_request: string) {
    const request = await this.requestsRepo.findOne({
      where: { id: id_request },
    });

    return !!request;
  }
  
  async requestDestinationExists(id_request_destination: string) {
    const requestDestination = await this.requestsDestinationRepo.findOne({
      where: { id: id_request_destination },
    });

    return !!requestDestination;
  }

  async getRequestStatus(id_request: string) {
    const request = await this.requestsRepo.findOne({
      where: { id: id_request },
      select: ['status']
      
    });

    return request!.status;
  }

  async getRequestStatusFromRequestDestination(id_request_destination: string) {
    const requestDestination = await this.requestsDestinationRepo.findOne({
      where: { id: id_request_destination},
      relations: ['request']
    });

    return requestDestination!.request.status;
  }

  async isRequestDestinationTravelAgencyId(id_request_destination: string, id_travel_agency: string)
  {
    const requestDestination = await this.requestsDestinationRepo.findOne({
      where: { id: id_request_destination, 
        request: {
          id_travel_agency: id_travel_agency
        }},
      relations: ['request']
    });

    // console.log(!!requestDestination);

    return !!requestDestination;
  }

}
