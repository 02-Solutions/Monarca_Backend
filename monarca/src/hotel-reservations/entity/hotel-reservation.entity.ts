import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RequestsDestination } from '../../requests-destinations/entities/requests-destination.entity';

@Entity({ name: 'hotel_reservations' })
export class HotelReservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => RequestsDestination,
    (requestDestination) => requestDestination.hotelReservations,
    { eager: true },
  )
  @JoinColumn({ name: 'id_request_destination' })
  requestDestination: RequestDestination;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'timestamptz' })
  check_in: Date;

  @Column({ type: 'timestamptz' })
  check_out: Date;

  @Column({ type: 'text' })
  address: string;

  @Column({ length: 60 })
  file_url: string;
}
