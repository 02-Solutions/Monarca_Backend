import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  // @ManyToOne(() => RequestDestination, (requestDestination) => requestDestination.flights, { eager: true })
  // requestDestination: RequestDestination;

}