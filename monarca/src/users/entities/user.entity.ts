import { ApiProperty } from '@nestjs/swagger';
import { Department } from 'src/departments/entity/department.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  id_department?: number;

  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  id_role?: number;

  @ApiProperty({ example: 'Juan' })
  @Column()
  name: string;

  @ApiProperty({ example: 'López' })
  @Column()
  last_name: string;

  @ApiProperty({ example: '123456' })
  @Column()
  password: string;

  @ApiProperty({ example: 'lopez@gmail.com' })
  @Column()
  email: string;

  @Column()
  @ApiProperty({ example: 'active' })
  status: string;

  @ManyToOne(() => Department, (department) => department.users, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_department' })
  department?: Department;
}
