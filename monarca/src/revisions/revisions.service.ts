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
import { NotificationsService } from 'src/notifications/notifications.service';
import { UserChecks } from 'src/users/user.checks.service';

@Injectable()
export class RevisionsService {
  constructor(
    @InjectRepository(Revision)
    private readonly revisionRepository: Repository<Revision>,
    private readonly requestService: RequestsService,
    private readonly requestChecks: RequestsChecks,
    private readonly notificationsService: NotificationsService,
    private readonly userChecks: UserChecks,
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

    const user = await this.userChecks.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const request = await this.requestService.getRequestById(data.id_request);
    if (!request) {
      throw new NotFoundException('Request not found.');
    }

    // Notify the user that a revision has been created
    await this.notificationsService.notify(
      user.email,
      'Solicitud con cambios necesarios',
      `Tu solicitud de viaje con el título "${request.title}" ha sido marcada con cambios necesarios.`,
      `<p>Hola ${user.name},</p>
<p>Tu solicitud de viaje con el título "<strong>${request.title}</strong>" ha sido marcada con cambios necesario. Por favor revisa los comentarios y ajusta tu solicitud.</p>
<p>Comentarios:</p>
<p>${data.comment}</p>
<p>Para más detalles, visita tu panel de solicitudes.</p>
<p>Saludos,</p>
<p>Equipo de Monarca</p>`,      
    );

    // const revision = this.revisionRepository.create(data);
    this.requestService.updateStatus(data.id_request, 'Changes Needed');
    return await this.revisionRepository.save(revision);
  }
}
