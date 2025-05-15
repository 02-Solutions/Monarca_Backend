import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Request as RequestEntity } from '../entities/request.entity';
import { RequestsDestination } from 'src/requests-destinations/entities/requests-destination.entity';

import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestsRepo: Repository<RequestEntity>,
  ) {}

  /**
   * Create a new Request along with nested destinations.
   * @param userId - ID of the user creating the request
   * @param data - DTO containing request and destinations details
   */
  async create(userId: string, data: CreateRequestDto): Promise<RequestEntity> {
    const entity = this.requestsRepo.create({
      id_user: userId,
      ...data,
      requests_destinations: data.requests_destinations.map((dto) => {
        const dest = new RequestsDestination();
        dest.id_destination = dto.id_destination;
        dest.destination_order = dto.destination_order;
        dest.stay_days = dto.stay_days;
        dest.arrival_date = new Date(dto.arrival_date);
        dest.departure_date = new Date(dto.departure_date);
        dest.is_hotel_required = dto.is_hotel_required ?? true;
        dest.is_plane_required = dto.is_plane_required ?? true;
        dest.is_last_destination = dto.is_last_destination ?? false;
        dest.details = dto.details ?? '';
        return dest;
      }),
    });
    return this.requestsRepo.save(entity);
  }

  async findAll(): Promise<RequestEntity[]> {
    return this.requestsRepo.find({ relations: ['requests_destinations'] });
  }

  async findOne(id: string): Promise<RequestEntity> {
    const entity = await this.requestsRepo.findOne({
      where: { id },
      relations: ['requests_destinations'],
    });
    if (!entity) throw new NotFoundException(`Request ${id} not found`);
    return entity;
  }

  async findByUser(userId: string): Promise<RequestEntity[]> {
    const list = await this.requestsRepo.find({
      where: { id_user: userId },
      relations: ['requests_destinations'],
    });
    if (!list.length)
      throw new NotFoundException(`No requests found for user ${userId}`);
    return list;
  }

  async update(id: string, dto: UpdateRequestDto): Promise<RequestEntity> {
    // Fetch existing request with children
    const entity = await this.requestsRepo.findOne({
      where: { id },
      relations: ['requests_destinations'],
    });
    if (!entity) throw new NotFoundException(`Request ${id} not found`);

    // Update root properties if provided
    if (dto.motive !== undefined) entity.motive = dto.motive;
    if (dto.priority !== undefined) entity.priority = dto.priority;
    if (dto.requirements !== undefined) entity.requirements = dto.requirements;
    if (dto.id_origin_city !== undefined)
      entity.id_origin_city = dto.id_origin_city;

    // Replace nested destinations if given
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
          dest.details = dtoDest.details ?? dest.details;
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
    const entity = await this.findOne(id);
    entity.status = data.status;
    return this.requestsRepo.save(entity);
  }

  async remove(id: string): Promise<{ status: boolean; message: string }> {
    await this.requestsRepo.delete(id);
    return { status: true, message: `Request ${id} removed` };
  }
}
