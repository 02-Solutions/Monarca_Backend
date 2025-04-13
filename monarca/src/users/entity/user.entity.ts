import { Department } from 'src/departments/entity/department.entity';
import { Role } from 'src/roles/entity/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // username: string;

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
  
  @Column()
  id_department: number;

  @Column()
  id_role: number;

  @ManyToOne(() => Department, department => department.users)
  @JoinColumn({ name: 'id_department' }) 
  department: Department;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'id_role' })
  role: Role;
}