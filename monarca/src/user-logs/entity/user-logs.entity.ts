import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
//import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'user_logs' })
export class UserLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number;

  // Se tiene que cambiar cuando tengamos el archivo de user
  //@ManyToOne(() => User, user => user.id)
  //@JoinColumn({ name: 'id_user' })
  //user: User;

  @Column()
  date: Date;

  @Column()
  ip: string;

  @Column()
  report: string;
}
