import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CostCenter } from 'src/cost-centers/entity/cost-centers.entity';
import { Department } from './src/departments/entity/department.entity';
import { Destination } from 'src/destinations/entities/destination.entity';
import { User } from 'src/users/entities/user.entity';
import { UserLogs } from 'src/user-logs/entity/user-logs.entity';
import { TravelAgency } from 'src/travel-agencies/entities/travel-agency.entity';
import { Request } from 'src/requests/entities/request.entity';
import { RequestsDestination } from 'src/requests/entities/requests-destination.entity';
import { RolePermission } from 'src/roles/entity/roles_permissions.entity';
import { Reservation } from 'src/reservations/entity/reservations.entity';
import { RequestLog } from 'src/request-logs/entities/request-log.entity';
import { Revision } from 'src/revisions/entities/revision.entity';
import { Voucher } from 'src/vouchers/entities/vouchers.entity';
import { Permission } from 'src/roles/entity/permissions.entity';
import { Roles } from 'src/roles/entity/roles.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

interface SeedData {
    repo: Repository<any>;
    file: string;
    entityName: string;
}

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);

    constructor(
        @InjectRepository(Department) private readonly departmentRepo: Repository<Department>,
        @InjectRepository(CostCenter) private readonly costCenterRepo: Repository<CostCenter>,
        @InjectRepository(Destination) private readonly destinationRepo: Repository<Destination>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(UserLogs) private readonly userLogsRepo: Repository<UserLogs>,
        @InjectRepository(TravelAgency) private readonly travelAgencyRepo: Repository<TravelAgency>,
        @InjectRepository(Request) private readonly requestRepo: Repository<Request>,
        @InjectRepository(RequestsDestination) private readonly requestsDestinationRepo: Repository<RequestsDestination>,
        @InjectRepository(Reservation) private readonly reservationRepo: Repository<Reservation>,
        @InjectRepository(RequestLog) private readonly requestLogRepo: Repository<RequestLog>,
        @InjectRepository(Revision) private readonly revisionRepo: Repository<Revision>,
        @InjectRepository(Voucher) private readonly voucherRepo: Repository<Voucher>,
        @InjectRepository(Permission) private readonly permissionRepo: Repository<Permission>,
        @InjectRepository(Roles) private readonly rolesRepo: Repository<Roles>,
        @InjectRepository(RolePermission) private readonly rolePermissionRepo: Repository<RolePermission>,
    ) {}

    async run() {
        const seedData: SeedData[] = [
            { repo: this.costCenterRepo, file: 'cost-centers.json', entityName: 'CostCenter' },
            { repo: this.departmentRepo, file: 'departments.json', entityName: 'Department' },
            { repo: this.permissionRepo, file: 'permissions.json', entityName: 'Permission' },
            { repo: this.destinationRepo, file: 'destinations.json', entityName: 'Destination' },
            { repo: this.travelAgencyRepo, file: 'travel-agencies.json', entityName: 'TravelAgency' },
            { repo: this.rolesRepo, file: 'roles.json', entityName: 'Roles' },
            { repo: this.userRepo, file: 'users.json', entityName: 'User' },
            { repo: this.rolePermissionRepo, file: 'roles-permissions.json', entityName: 'RolePermission' },
            { repo: this.userLogsRepo, file: 'user-logs.json', entityName: 'UserLogs' },
            { repo: this.requestRepo, file: 'requests.json', entityName: 'Request' },
            { repo: this.requestsDestinationRepo, file: 'requests-destinations.json', entityName: 'RequestsDestination' },
            { repo: this.reservationRepo, file: 'reservations.json', entityName: 'Reservation' },
            { repo: this.requestLogRepo, file: 'request-logs.json', entityName: 'RequestLog' },
            { repo: this.revisionRepo, file: 'revisions.json', entityName: 'Revision' },
            { repo: this.voucherRepo, file: 'vouchers.json', entityName: 'Voucher' },
        ];

        const hashPasswords = async (user: User) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
            return user;
        };

        for (const { repo, file, entityName } of seedData) {
            const count = await repo.count();
            if (count > 0) {
                this.logger.log(`There are already ${entityName}s in the database. Seeding skipped.`);
                continue;
            }

            this.logger.log('----------------------------------');
            this.logger.log(`Seeding ${entityName} data...`);
            this.logger.log('----------------------------------');
            this.logger.log('Loading data from JSON file...');
            this.logger.log('----------------------------------');

            const filePath = path.join(__dirname, 'seeds', file);
            if (!fs.existsSync(filePath)) {
                this.logger.error(`File ${filePath} not found.`);
                continue;
            }

            const rawData = fs.readFileSync(filePath, 'utf-8');
            const entities: Record<string, any>[] = JSON.parse(rawData);

            for (const entity of entities) {
                if (entityName === 'User') {
                    let user: User | undefined;
                    user = await hashPasswords(entity as User);
                    await repo.save(user);
                } else if (entityName === 'Department') {
                    const costCenter = await this.costCenterRepo.findOneByOrFail({ id: entity.cost_center_id });
                    
                    const department = this.departmentRepo.create({
                        id: entity.id,
                        name: entity.name,
                        cost_center: costCenter,
                    });
                
                    await this.departmentRepo.save(department);
                } else {
                    const newEntity = repo.create(entity);
                    await repo.save(newEntity);
                }
                
                this.logger.log(`${entityName} ${JSON.stringify(entity)} created`);
            }

            this.logger.log('----------------------------------');
            this.logger.log(`Seeding ${entityName} data completed.`);
            this.logger.log('----------------------------------');
        }
    }


    async truncate() {
        this.logger.log('🔄 Starting manual truncate without disabling FK constraints...');

        const connection = this.departmentRepo.manager.connection;
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();

        try {
            await queryRunner.startTransaction();

            const tables = [
                'vouchers',
                'revisions',
                'request_logs',
                'reservations',
                'requests_destinations',
                'requests',
                'user_logs',
                'roles_permissions',
                'users',
                'roles',
                'travel_agencies',
                'destinations',
                'permissions',
                'departments',
                'cost_centers'
            ];

            for (const table of tables) {
                this.logger.log(`🧨 Truncating table ${table}...`);
                await queryRunner.query(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`);
            }

            await queryRunner.commitTransaction();
            this.logger.log('✅ Truncate completed.');
        } catch (error) {
            this.logger.error('❌ Error during truncate:', error);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }



    async dropAllTables() {
        const connection = this.departmentRepo.manager.connection;
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();

        try {
            await queryRunner.startTransaction();

            this.logger.warn('❌ Dropping all tables via schema reset...');
            await queryRunner.query(`DROP SCHEMA public CASCADE;`);
            await queryRunner.query(`CREATE SCHEMA public;`);
            this.logger.log('✅ All tables dropped and schema recreated.');

            await queryRunner.commitTransaction();
        } catch (error) {
            this.logger.error('❌ Error dropping all tables:', error);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

}