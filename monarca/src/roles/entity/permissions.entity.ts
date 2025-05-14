import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolePermission } from './roles_permissions.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => RolePermission, rp => rp.role)
  rolePermissions: RolePermission[];
}
