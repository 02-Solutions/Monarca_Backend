import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
@Entity({ name: 'departments' })
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // One department can have many users.
  @OneToMany(() => User, (user) => user.department)
  users: User[];
}
