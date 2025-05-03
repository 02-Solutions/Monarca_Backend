import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entity/reservations.entity';
import { CreateReservationDto, UpdateReservationDto } from './dto/reservation.dtos';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
  ) {}

  async create(reservation: CreateReservationDto) {
    const newReservation = this.reservationsRepository.create(reservation);
    return this.reservationsRepository.save(newReservation);
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find();
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOneBy({ id });
    if (!reservation) {
      throw new NotFoundException(`Reservation ${id} not found`);
    }
    return reservation;
  }

  async update(id: string, Body: UpdateReservationDto) {
    return await this.reservationsRepository.update(id, Body);
  }

  async remove(id: string): Promise<{ message: string; status: boolean }> {
    const reservation = await this.reservationsRepository.findOneBy({ id });
    await this.reservationsRepository.delete(id);
    return {
      message: `Reservation ${reservation?.id} deleted,`,
      status: true,
    };
  }
}