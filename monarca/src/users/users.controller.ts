import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {

    @Get()
    getTest() {
        return 'UsersController is working';
    }

}
