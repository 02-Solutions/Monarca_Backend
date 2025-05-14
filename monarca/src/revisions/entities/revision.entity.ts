import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RequestsDestination } from 'src/requests/entities/requests-destination.entity';
import { RequestLog } from 'src/request-logs/entities/request-log.entity';
import { Request } from 'src/requests/entities/request.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'revisions' })
export class Revision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_user' })
  id_user: string;

  @Column({ name: 'id_request' })
  id_request: string;

  @Column()
  comment: string;

  // Relationships

  @ManyToOne(() => Request, (request) => request.requests_destinations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_request' })
  request: Request;

  //HACER CONEXION DESPUES
  // @ManyToOne(() => User, (request) => request.revisions, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'id_user' })
  // user: User;
}
