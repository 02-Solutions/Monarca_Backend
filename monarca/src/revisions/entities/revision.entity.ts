import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { RequestsDestination } from 'src/requests-destinations/entities/requests-destination.entity';
import { RequestLog } from 'src/request-logs/entities/request-log.entity';
import { Request } from 'src/requests/entities/request.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'revisions' })
export class Revision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_user', type: 'uuid' })
  id_user: string;

  @Column({ name: 'id_request' })
  id_request: string;

  @Column()
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;


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
