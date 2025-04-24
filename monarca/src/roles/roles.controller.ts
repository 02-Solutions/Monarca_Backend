import { Controller, Post, Body } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body('name') name: string): Promise<Role> {
    return this.rolesService.create(name);
  }

}

