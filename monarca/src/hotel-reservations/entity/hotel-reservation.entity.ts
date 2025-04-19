import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity({name:'hotel_reservations'})
export class HotelReservation {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => RequestDestination, (requestDestination) => requestDestination.hotelReservations, { eager: true })
  // requestDestination: RequestDestination;

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
