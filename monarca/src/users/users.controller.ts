import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/decorators/role.decorator';

@Controller('users')
export class UsersController {

    @Get()
    getTest() {
        return 'UsersController is working';
    }

}
