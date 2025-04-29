import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'user_logs' })
export class UserLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number;
  

  @Column()
  date: Date;

  @Column()
  ip: string;

  @Column()
  report: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'id_user' })
  user: User;
  
}
