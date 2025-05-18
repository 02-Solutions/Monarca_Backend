import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateRevisionDto } from './dto/create-revision.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Revision } from './entities/revision.entity';
import { RequestsService } from 'src/requests/requests.service';
import { RequestInterface } from 'src/guards/interfaces/request.interface';
import { RequestsChecks } from 'src/requests/requests.checks';

@Injectable()
export class RevisionsService {
  constructor(
    @InjectRepository(Revision)
    private readonly revisionRepository: Repository<Revision>,
    private readonly requestService: RequestsService,
    private readonly requestChecks: RequestsChecks,
  ) {}

  async create(req: RequestInterface, data: CreateRevisionDto) {
    const userId = req.sessionInfo.id;

    if (!(await this.requestChecks.requestExists(data.id_request))) {
      throw new NotFoundException('Invalid request id.');
    }

    if (!(await this.requestChecks.isRequestsAdmin(data.id_request, userId))) {
      throw new UnauthorizedException('Unable to write to that request.');
    }

    const requestStatus = await this.requestChecks.getRequestStatus(data.id_request)
    if (requestStatus !== 'Pending Review' &&
        requestStatus !== 'Changes Needed') {
      throw new UnauthorizedException('Unable to create a revision because of the requets status.');
    }

    const revision = this.revisionRepository.create({
      ...data,
      id_user: userId,
    });

    // const revision = this.revisionRepository.create(data);
    this.requestService.updateStatus(data.id_request, 'Changes Needed');
    return await this.revisionRepository.save(revision);
  }
}
