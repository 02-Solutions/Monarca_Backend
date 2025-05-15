import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { RequestsDestination } from 'src/requests/entities/requests-destination.entity';
import { RequestLog } from 'src/request-logs/entities/request-log.entity';
import { Revision } from 'src/revisions/entities/revision.entity';
import { Destination } from 'src/destinations/entities/destination.entity';
import { User } from 'src/users/entities/user.entity';
import { TravelAgency } from 'src/travel-agencies/entities/travel-agency.entity';

@Entity({ name: 'requests' })
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_user', type: 'uuid' })
  id_user: string;

  @Column()
  id_origin_city: string;

  @Column()
  id_admin: string;

  @Column({ nullable: true, default: null })
  id_travel_agency: string;

  @Column()
  motive: string;

  @Column()
  advance_money: number;

  @Column({ default: 'Pending Review' })
  status: string;

  @Column({ nullable: true })
  requirements?: string;

  @Column()
  priority: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relationships

  @OneToMany(() => RequestsDestination, (dest) => dest.request, {
    cascade: true,
  })
  requests_destinations: RequestsDestination[];

  @OneToMany(() => RequestLog, (log) => log.request, {})
  requestLogs: RequestLog[];

  @OneToMany(() => Revision, (rev) => rev.request, {})
  revisions: Revision[];

  @ManyToOne(() => Destination, (dest) => dest.requests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_origin_city' })
  destination: Destination;

  @ManyToOne(() => User, (usr) => usr.requests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => User, (usr) => usr.requests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_admin' })
  admin: User;

  @ManyToOne(() => TravelAgency, (trva) => trva.requests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_travel_agency' })
  travel_agency: TravelAgency;
}
