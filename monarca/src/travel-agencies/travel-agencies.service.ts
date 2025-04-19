import { Injectable } from '@nestjs/common';
import { CreateTravelAgencyDto } from './dto/create-travel-agency.dto';
import { UpdateTravelAgencyDto } from './dto/update-travel-agency.dto';

@Injectable()
export class TravelAgenciesService {
  create(createTravelAgencyDto: CreateTravelAgencyDto) {
    return 'This action adds a new travelAgency';
  }

  findAll() {
    return `This action returns all travelAgencies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} travelAgency`;
  }

  update(id: number, updateTravelAgencyDto: UpdateTravelAgencyDto) {
    return `This action updates a #${id} travelAgency`;
  }

  remove(id: number) {
    return `This action removes a #${id} travelAgency`;
  }
}
