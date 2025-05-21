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

  @Column({ name: 'id_request' })
  id_request: string;

  @Column({ name: 'id_user' })
  id_user: string;

  @Column({ name: 'old_status' })
  old_status: string;

  @Column({ name: 'new_status' })
  new_status: string;

  @Column({
    name: 'change_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  change_date: string;

  // Relationships
  @ManyToOne(() => Request, (request) => request.requestLogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_request' })
  request: Request;
}
