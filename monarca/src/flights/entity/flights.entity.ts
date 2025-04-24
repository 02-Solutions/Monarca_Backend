import { Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne } from "typeorm";
  import { RequestsDestination } from '../../requests-destinations/entities/requests-destination.entity';


@Entity("flights")
export class Flight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type : 'timestamp with time zone', nullable: false})
  departure_time: Date;

  @Column({type : 'timestamp with time zone', nullable: false})
  arrival_time: Date;

  @Column({type: 'varchar', length: 10, nullable: false})
  departure_airport: string;

  @Column({type: 'varchar', length: 10, nullable: false})
  arrival_airport: string;

  @Column({type: 'varchar', length: 10, nullable: false})
  flight_number: string;

  @ManyToOne(() => RequestsDestination, (requestDestination) => requestDestination.flights, { eager: true })
  requestDestination: RequestDestination;

}