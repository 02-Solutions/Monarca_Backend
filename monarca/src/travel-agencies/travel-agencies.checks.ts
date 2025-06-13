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
export class TravelAgenciesChecks {
  constructor(
    @InjectRepository(TravelAgency)
    private readonly repo: Repository<TravelAgency>,
  ) {}

  async Exists(id_travel_agency: string) {
    const travel_agency = await this.repo.findOne({
      where: { id: id_travel_agency },
    });

    return !!travel_agency;
  }

  async getTravelAgencyUsers(id_travel_agency: string) {
    const travel_agency = await this.repo.findOne({
      where: { id: id_travel_agency },
      relations: ['users'],
    });
    if (!travel_agency) {
      throw new NotFoundException('Travel agency not found');
    }
    if (travel_agency.users.length === 0) {
      throw new NotFoundException('No users found for this travel agency');
    }
    return travel_agency.users;
  }
}
