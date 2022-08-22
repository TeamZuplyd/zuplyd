import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private mailService: MailerService) {}

  getData(): { message: string } {
    return { message: 'Welcome to notification!' };
  }

  async sendEmail(email: string, name: string) {
    console.log(email);
    await this.mailService.sendMail({
      to: email,
      subject: 'Invitaion: Team Zuplyd',
      template: 'welcome',
      context: {
        name: name,
      },
    });
  }
}
