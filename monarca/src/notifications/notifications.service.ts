import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // o 'hotmail', 'outlook', etc.
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
}
