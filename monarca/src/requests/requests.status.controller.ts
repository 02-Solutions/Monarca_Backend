import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions.guard';
import { RequestInterface } from 'src/guards/interfaces/request.interface';
import { RequestsStatusService } from './requests.status.service';
import { ApproveRequestDTO } from './dto/approve-request.dto';

@UseGuards(AuthGuard, PermissionsGuard)
@Controller('requests')
export class RequestsStatusController {
  constructor(private readonly requestsStatusService: RequestsStatusService) {}

  @Patch('approve/:id')
  async approve(
    @Request() req: RequestInterface,
    @Param('id', new ParseUUIDPipe()) id_request: string,
    @Body() data: ApproveRequestDTO,
  ) {
    return await this.requestsStatusService.approve(req, id_request, data);
  }

  @Patch('deny/:id')
  async deny(
    @Request() req: RequestInterface,
    @Param('id', new ParseUUIDPipe()) id_request: string,
  ) {
    return await this.requestsStatusService.deny(req, id_request);
  }

  @Patch('cancel/:id')
  async cancel(
    @Request() req: RequestInterface,
    @Param('id', new ParseUUIDPipe()) id_request: string,
  ) {
    return await this.requestsStatusService.cancel(req, id_request);
  }

  @Patch('finished-reservations/:id')
  async finsihedReservations(
    @Request() req: RequestInterface,
    @Param('id', new ParseUUIDPipe()) id_request: string,
  ) {
    return await this.requestsStatusService.finishedReservations(
      req,
      id_request,
    );
  }

  @Patch('SOI-approve/:id')
  async SOIApproval(
    @Request() req: RequestInterface,
    @Param('id', new ParseUUIDPipe()) id_request: string,
  ) {
    return await this.requestsStatusService.SOIApproval(req, id_request);
  }

  @Patch('finished-uploading-vouchers/:id')
  async finsihedUploadingVouchers(
    @Request() req: RequestInterface,
    @Param('id', new ParseUUIDPipe()) id_request: string,
  ) {
    return await this.requestsStatusService.finishedUploadingVouchers(
      req,
      id_request,
    );
  }

  @Patch('finished-approving-vouchers/:id')
  async finsihedApprovingVouchers(
    @Request() req: RequestInterface,
    @Param('id', new ParseUUIDPipe()) id_request: string,
  ) {
    return await this.requestsStatusService.finishedApprovingVouchers(
      req,
      id_request,
    );
  }

  @Patch('complete-request/:id')
  async finsihedRegisteringRequest(
    @Request() req: RequestInterface,
    @Param('id', new ParseUUIDPipe()) id_request: string,
  ) {
    return await this.requestsStatusService.finsihedRegisteringRequest(
      req,
      id_request,
    );
  }
}
