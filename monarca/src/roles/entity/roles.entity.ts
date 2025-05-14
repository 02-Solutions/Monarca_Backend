import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RolePermission } from './roles_permissions.entity';
import { Permission } from './permissions.entity';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: { name: 'id_role', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'id_permission', referencedColumnName: 'id' },
  })
  permissions: Permission[];

  @OneToMany(() => RolePermission, rp => rp.permission)
  rolePermissions: RolePermission[];
}
