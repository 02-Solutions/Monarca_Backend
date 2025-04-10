import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from 'src/users/entity/user.entity';
@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // One department can have many users.
  @OneToMany(() => User, user => user.department)
  users: User[];
}