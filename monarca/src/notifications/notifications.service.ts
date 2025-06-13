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
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const fromAddress = `"Sistema Monarca" <${process.env.EMAIL_USER}>`;
    const mailOptions: nodemailer.SendMailOptions = {
      from: fromAddress,
      to,
      subject,
      text,
      html,
    };
    return this.transporter.sendMail(mailOptions);
  }

  async sendNotification(
    to: string,
    subject: string,
    text: string,
    html?: string
  ) {
    return this.sendMail(
      to, 
      subject, 
      text, 
      html
  );
  }


  async notify(
  to: string,
  subject: string,
  message: string,
  html?: string
) {
  
  // Si deseas escapar texto plano a HTML seguro, implementa un escape sencillo:
    const escapeHtml = (str: string) =>
      str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    // Supongamos que el caller pasa texto plano: "Hola, este es mi mensaje"
    // Para permitir HTML opcional, podrías distinguir: si detectas etiquetas HTML, no escapar.
    // Aquí un enfoque simple: siempre tratamos message como texto plano:
    const safeText = escapeHtml(message);

    // Generar HTML sencillo, con estilo inline mínimo si quieres:
    const htmlComplete = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${escapeHtml(subject)}</title>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;

    return this.sendMail(to, subject, message, htmlComplete);
}

}
