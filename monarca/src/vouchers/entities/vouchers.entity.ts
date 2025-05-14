import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,JoinColumn } from 'typeorm';
import { RequestsDestination } from 'src/requests-destinations/entities/requests-destination.entity';

@Entity({ name: 'vouchers' })
export class Voucher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_request_destination', type: 'uuid' })
  id_request_destination: string;

  @Column({ name: 'class', type: 'varchar' })
  class: string;

  @Column({ name: 'amount', type: 'float' })
  amount: number;

  @Column({ name: 'currency', type: 'varchar' })
  currency: string;

  @Column({ name: 'date', type: 'timestamptz' })
  date: Date;

  @Column({ name: 'file_url', type: 'varchar' })
  fileUrl: string;

  @Column({ name: 'status', type: 'varchar' })
  status: string;

  @ManyToOne(() => RequestsDestination, (requestsDestination) => requestsDestination.id)
  @JoinColumn({ name: 'id_request_destination' })
  requestDestination: RequestsDestination;
  
}
