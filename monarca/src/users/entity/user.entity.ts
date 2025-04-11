import { Department } from 'src/departments/entity/department.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;
  
  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  password: string;

  @Column()
  status: string;

  @ManyToOne(() => Department, department => department.users)
  @JoinColumn({ name: 'id_department' }) 
  department: Department;
}