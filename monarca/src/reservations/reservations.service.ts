import { Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entity/reservations.entity';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from './dto/reservation.dtos';
import { RequestsChecks } from 'src/requests/requests.checks';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions.guard';
import { RequestInterface } from 'src/guards/interfaces/request.interface';


@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
    private readonly requestChecks: RequestsChecks

  ) {}

  async createReservation(req: RequestInterface,reservation: CreateReservationDto) {
    
    // //VALIDAR USER Y id_request_destination
    const id_travel_agency = req.userInfo.id_travel_agency;
    if (!(id_travel_agency && await this.requestChecks.isRequestDestinationTravelAgencyId(reservation.id_request_destination, id_travel_agency))) {
      throw new UnauthorizedException('Unable to add reservation to that request.');
    }
    
    //VALIDAR ESTADO DE REQUEST
    const requestStatus = await this.requestChecks.getRequestStatusFromRequestDestination(reservation.id_request_destination)
    if (requestStatus !== 'Pending Reservations') {
      throw new UnauthorizedException('Unable to create reservation because of the requests status.');
    }

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
