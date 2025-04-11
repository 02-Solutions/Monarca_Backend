import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChecks } from './user.checks.service';
import { User } from './entity/user.entity';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers: [UserChecks],
    exports: [UserChecks]
})
export class UsersModule {}
