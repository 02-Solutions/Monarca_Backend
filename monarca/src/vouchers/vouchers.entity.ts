import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('vouchers')
export class Voucher {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  id_request: string;

  @Column()
  class: string;

  @Column('float')
  amount: number;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column()
  file_url: string;
}
