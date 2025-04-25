import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Request } from 'src/requests/entities/request.entity';
import { HotelReservation } from 'src/hotel-reservations/entity/hotel-reservation.entity';
import { Flight } from 'src/flights/entity/flights.entity';

@Entity({ name: 'requests_destinations' })
export class RequestsDestination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_destination' })
  id_destination: string;

  @Column({ name: 'id_request' })
  id_request: string;

  @Column({ name: 'destination_order', type: 'int' })
  destination_order: number;

  @Column({ name: 'stay_days', type: 'int' })
  stay_days: number;

  @Column({ name: 'arrival_date', type: 'timestamp' })
  arrival_date: Date;

  @Column({ name: 'departure_date', type: 'timestamp' })
  departure_date: Date;

  @Column({ name: 'is_hotel_required', default: true })
  is_hotel_required: boolean;

  @Column({ name: 'is_plane_required', default: true })
  is_plane_required: boolean;

  @Column({ name: 'is_last_destination', default: false })
  is_last_destination: boolean;

  @Column({ name: 'details', nullable: true })
  details: string;

  // Relationships

  @ManyToOne(() => Request, (request) => request.requests_destinations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_request' })
  request: Request;

  @OneToMany(
    () => HotelReservation,
    (hotelReservation) => hotelReservation.requestDestination,
  )
  hotelReservations: HotelReservation[];

  @OneToMany(() => Flight, (flight) => flight.requestDestination)
  flights: Flight[];
}
