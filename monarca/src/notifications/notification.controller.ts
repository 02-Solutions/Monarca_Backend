import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send')
  async sendNotification(
    @Body() body: {
      type: 'creada' | 'aprobada' | 'denegada' | 'modificacion';
      to: string;
      context: Record<string, string>;
    },
  ) {
    return this.notificationsService.notify(body.type, body.to, body.context);
  }
}
