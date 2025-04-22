import { ApiProperty } from '@nestjs/swagger';
import { Department } from 'src/departments/entity/department.entity';
import { Role } from 'src/roles/entity/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'juan@gmail.com' })
  @Column()
  email: string;

  @ApiProperty({ example: 'Juan' })
  @Column()
  name: string;

  @ApiProperty({ example: 'López' })
  @Column()
  last_name: string;

  @ApiProperty({ example: '123456' })
  @Column()
  password: string;

  @ApiProperty({ example: 'active' })
  @Column()
  status: string;

  @ApiProperty({ example: 1 })
  @Column()
  id_department: number;

  @ApiProperty({ example: 2 })
  @Column()
  id_role: number;

  @ManyToOne(() => Department, (department) => department.users)
  @JoinColumn({ name: 'id_department' })
  department: Department;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'id_role' })
  role: Role;
}
