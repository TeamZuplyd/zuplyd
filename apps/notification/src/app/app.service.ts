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
        company: name,
      },
    });
  }

  async sendEmailBulk(comp_name: string, role: string, email_list: Array<string>) {
    await email_list.forEach((email) =>
      this.mailService.sendMail({
        to: email,
        subject: `Invitation to join ${comp_name}`,
        template: 'welcome',
        context: {
          company: comp_name,
          role: role,
        },
      })
    );
  }
}
