import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class HotelReservations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  check_in: Date;

  @Column()
  check_out: Date;

  @Column()
  address: string;

  @Column()
  file_url: string;

//falta request destination 


}