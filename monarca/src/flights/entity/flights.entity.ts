import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("flights")
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  id_request_destination: number 
    
  @Column({type : 'time with time zone', nullable: false})
  departure_time: Date;

  @Column({type : 'time with time zone', nullable: false})
  arrival_time: Date;

  @Column({type: 'varchar', length: 10, nullable: false})
  departure_airport: string;

  @Column({type: 'varchar', length: 10, nullable: false})
  arrival_airport: string;

  @Column({type: 'varchar', length: 10, nullable: false})
  flight_number: string;

  // @ManyToOne(() => RequestDestination, (requestDestination) => requestDestination.flightst a, { eager: true })
  // requestDestination: RequestDestination;

}