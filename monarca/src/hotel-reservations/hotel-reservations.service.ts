import { Injectable } from '@nestjs/common';
import { HotelReservations } from './entity/hotel-reservations.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHotelReservationDto } from './dto/create-hotel-reservation.dto';
import { UpdateHotelReservationDto } from './dto/update-hotel-reservation.dto';

@Injectable()
export class HotelReservationsService {

    constructor(
        @InjectRepository(HotelReservations)
        private readonly hotelReservationsRepository: Repository<HotelReservations>,
    ) {}

    findAll() {
        return this.hotelReservationsRepository.find();
 
    }

    findOne(id: number) {
        return this.hotelReservationsRepository.findOne({ where: { id } });
    }

    async update(id: number,  updateHotelReservationDto: UpdateHotelReservationDto) {
        const reservation= await this.hotelReservationsRepository.update(id, updateHotelReservationDto);
        return reservation;
    }

    async remove(id: number) {
        const reservation = await this.hotelReservationsRepository.delete(id);
        return reservation;
    }    

    create(createHotelReservationDto: CreateHotelReservationDto) {
        const reservation = this.hotelReservationsRepository.create(createHotelReservationDto);
        return this.hotelReservationsRepository.save(reservation);
        
    }
}
