import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { RequestsDestination } from 'src/requests-destinations/entities/requests-destination.entity';
import { RequestLog } from 'src/request-logs/entities/request-log.entity';
import { Revision } from 'src/revisions/entities/revision.entity';

@Entity({ name: 'requests' })
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /* Cambió a uuid */
  @Column({ name: 'id_user', type: 'uuid'})
  id_user: string;  

  @Column({ name: 'id_origin_city' })
  id_origin_city: string;

  @Column()
  motive: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  requirements?: string;

  @Column()
  priority: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relationships

  @OneToMany(() => RequestsDestination, (dest) => dest.request, {
    eager: true,
    cascade: true,
  })
  requests_destinations: RequestsDestination[];

  @OneToMany(() => RequestLog, (log) => log.request, { eager: true })
  requestLogs: RequestLog[];

  @OneToMany(() => Revision, (log) => log.request, { eager: true })
  revisions: Revision[];
}
