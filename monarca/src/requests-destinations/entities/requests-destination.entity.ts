import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Request } from 'src/requests/entities/request.entity';

@Entity({ name: 'requests_destinations' })
export class RequestsDestination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'destination_id' })
  destinationId: string;

  @Column({ name: 'request_id' })
  requestId: string;

  @Column({ name: 'destination_order', type: 'int' })
  destinationOrder: number;

  @Column({ name: 'stay_days', type: 'int' })
  stayDays: number;

  @Column({ name: 'arrival_date', type: 'timestamp' })
  arrivalDate: Date;

  @Column({ name: 'departure_date', type: 'timestamp' })
  departureDate: Date;

  @Column({ name: 'is_hotel_required', default: true })
  isHotelRequired: boolean;

  @Column({ name: 'is_plane_required', default: true })
  isPlaneRequired: boolean;

  @Column({ name: 'is_last_destination', default: false })
  isLastDestination: boolean;

  // Relationships

  @ManyToOne(() => Request, (request) => request.requestsDestinations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'request_id' })
  request: Request;
}
