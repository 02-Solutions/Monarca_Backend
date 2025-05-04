import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTravelAgencyDto,
  TravelAgencyDto,
  UpdateTravelAgencyDto,
} from './dto/travel-agency.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelAgency } from './entities/travel-agency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TravelAgenciesService {
  constructor(
    @InjectRepository(TravelAgency)
    private readonly repo: Repository<TravelAgency>,
  ) {}

  create(data: CreateTravelAgencyDto) {
    const ent = this.repo.create(data);
    return this.repo.save(ent);
  }

  async update(
    id: string,
    data: UpdateTravelAgencyDto,
  ): Promise<TravelAgencyDto> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  remove(id: string) {
    return `This action removes a #${id} travelAgency`;
  }

  findAll(): Promise<TravelAgencyDto[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<TravelAgencyDto> {
    const ent = await this.repo.findOneBy({ id });
    if (!ent) throw new NotFoundException(`Travel agency ${id} not found`);
    return ent;
  }
}
