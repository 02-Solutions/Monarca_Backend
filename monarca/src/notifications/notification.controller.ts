import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send')
  async sendEmail(
    @Body() body: { to: string; subject: string; text: string; html?: string }
  ) {
    await this.notificationsService.sendMail(
      body.to,
      body.subject,
      body.text,
      body.html
    );
    return { message: 'Correo enviado correctamente.' };
  }
}
