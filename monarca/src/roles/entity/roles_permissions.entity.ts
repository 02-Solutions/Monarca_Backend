import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Roles } from './roles.entity';
import { Permission } from './permissions.entity';

@Entity('roles_permissions')
export class RolePermission {
  @PrimaryColumn()
  id_role: string;

  @PrimaryColumn()
  id_permission: string;

  @ManyToOne(() => Roles, role => role.rolePermissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_role' })
  role: Roles;

  @ManyToOne(() => Permission, permission => permission.rolePermissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_permission' })
  permission: Permission;
}
