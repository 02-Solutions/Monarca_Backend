import { Injectable, 
    NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './entity/flights.entity.js';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';


@Injectable()
export class FlightsService {

    constructor(
        @InjectRepository(Flight)
        private flightsRepository: Repository<Flight>,
    ) {}

    
    async create(flight: CreateFlightDto) {
        const newFlight = this.flightsRepository.create(flight);
        return this.flightsRepository.save(newFlight);
    }

    async findAll() : Promise<Flight[]> {
        return this.flightsRepository.find();

    }

    async findOne(id: string): Promise<Flight> {
         const flight = await this.flightsRepository.findOneBy({ id });
         if (!flight) {
             throw new NotFoundException(`Flight ${id} not found`);
            }
        return flight
    }

    async update(id: string, Body: UpdateFlightDto) {
        const flightToUpdate = await this.flightsRepository.update(id, Body);
        if (!flightToUpdate) {  
            throw new NotFoundException(`Flight ${id} not found`);
        }
        return flightToUpdate;
    }

    async remove(id: string) : | Promise<{ message: string, status: boolean }> {
        await this.flightsRepository.delete(id);
        return { message: `Flight ${id} deleted,`, status: true };

    }

}
