import { ApiProperty } from '@nestjs/swagger';
import { Department } from 'src/departments/entity/department.entity';
import { Request } from 'src/requests/entities/request.entity';
import { Revision } from 'src/revisions/entities/revision.entity';
import { Roles } from 'src/roles/entity/roles.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  id_department?: string;

  @ApiProperty({ example: 2 })
  @Column()
  id_role: string;

  @ManyToOne(() => Department, (department) => department.users)
  @JoinColumn({ name: 'id_department' })
  department?: Department;

  @ManyToOne(() => Roles)
  @JoinColumn({ name: 'id_role' })
  role: Roles;

  // Hacer conexion despues
  @OneToMany(() => Revision, (log) => log.request, {})
  revisions: Revision[];

  @OneToMany(() => Request, (req) => req.user, {})
  requests: Request[];

  @OneToMany(() => Request, (req) => req.admin, {})
  assigned_requests: Request[];
}
