import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import { join } from 'path';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      from: `"Sistema Monarca" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    return this.transporter.sendMail(mailOptions);
  }

   async sendTemplateMail(to: string, subject: string, templateName: string, context: Record<string, any>) {
    try {
      const templatePath = join(__dirname, 'templates', `${templateName}.html`);
      const source = fs.readFileSync(templatePath, 'utf8');
      const compiledTemplate = Handlebars.compile(source);
      const html = compiledTemplate(context);
      return this.sendMail(to, subject, '', html);
    } catch (error) {
      console.error('❌ Error enviando correo:', error);
      throw new InternalServerErrorException('Error interno al enviar correo');
    }
  }


  async notify(
  type: 'creada' | 'aprobada' | 'denegada' | 'modificacion',
  to: string,
  context: Record<string, any>
) {
  const subjects = {
    creada: 'Solicitud de viaje registrada',
    aprobada: 'Solicitud de viaje aprobada',
    denegada: 'Solicitud de viaje denegada',
    modificacion: 'Modificación requerida en tu solicitud de viaje',
  };

  const templates = {
    creada: 'request-created',
    aprobada: 'request-approved',
    denegada: 'request-denied',
    modificacion: 'request-updated',
  };

  return this.sendTemplateMail(to, subjects[type], templates[type], context);
}

}
