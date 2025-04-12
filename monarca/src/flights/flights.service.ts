import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './entity/flights.entity.js';

@Injectable()
export class FlightsService {

    constructor(
        @InjectRepository(Flight)
        private flightsRepository: Repository<Flight>,
    ) {}

    
    create(flight: any) {
        return flight;
    }

    findAll() {
        return this.flightsRepository.find();

    }

    findOne(id: number) {
        return this.flightsRepository.findOne({ where: { id } });
    }

    async update(id: number, Body: any) {
        const flightToUpdate = await this.flightsRepository.findOne({ where: { id } });
        return flightToUpdate;
    }

    remove(id: number) {
        return {};
    }

}
