import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Request } from 'src/requests/entities/request.entity';

@Entity({ name: 'request_logs' })
export class RequestLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_requests' })
  idRequests: string;

  @Column({ name: 'id_user' })
  idUser: string;

  @Column({ name: 'old_status' })
  oldStatus: string;

  @Column({ name: 'new_status' })
  newStatus: string;

  @Column({
    name: 'change_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  changeDate: string;

  // Relationships
  @ManyToOne(() => Request, (request) => request.requestLogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_requests' })
  request: Request;
}
