import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestsRepository: Repository<Request>,
  ) {}

  async create(data: CreateRequestDto): Promise<Request> {
    const request = this.requestsRepository.create({
      id_user: 'test123', //Lo obtendremos del session cookie despues
      id_origin_city: data.originCityId,
      motive: data.motive,
      priority: data.priority,
      requirements: data.requirements,
      requests_destinations: data.requests_destinations.map((destDto) => ({
        id_destination: destDto.id_destination,
        destination_order: destDto.destination_order,
        stay_days: destDto.stay_days,
        arrival_date: new Date(destDto.arrival_date),
        departure_date: new Date(destDto.departure_date),
        is_hotel_required: destDto.is_hotel_required,
        is_plane_required: destDto.is_plane_required,
        is_last_destination: destDto.is_last_destination,
        details: destDto.details,
      })),
    });

    return this.requestsRepository.save(request);
  }

  async findAll(): Promise<Request[]> {
    return this.requestsRepository.find();
  }

  async findOne(id: string): Promise<Request> {
    const request = await this.requestsRepository.findOneBy({ id });
    if (!request) {
      throw new NotFoundException(`Request ${id} not found`);
    }
    return request;
  }

  async update(id: string, data: UpdateRequestDto): Promise<Request> {
    await this.requestsRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ status: boolean; message: string }> {
    await this.requestsRepository.delete(id);
    return { status: true, message: `Request ${id} removed` };
  }
}
