import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RequestsDestination } from 'src/requests-destinations/entities/requests-destination.entity';
import { RequestLog } from 'src/request-logs/entities/request-log.entity';

@Entity({ name: 'requests' })
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_user' })
  userId: string;

  @Column({ name: 'id_admin' })
  adminId: string;

  @Column({ name: 'id_travel_agent' })
  travelAgentId: string;

  @Column({ name: 'id_origin_city' })
  originCityId: string;

  @Column()
  motive: string;

  @Column({ name: 'is_multi_user', default: false })
  isMultiUser: boolean;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  requirements?: string;

  @Column()
  priority: string;

  @Column({ name: 'cancellation_reason', nullable: true })
  cancellationReason?: string;

  // Relationships

  @OneToMany(() => RequestsDestination, (dest) => dest.request, { eager: true })
  requestsDestinations: RequestsDestination[];

  @OneToMany(() => RequestLog, (log) => log.request, { eager: true })
  requestLogs: RequestLog[];
}
