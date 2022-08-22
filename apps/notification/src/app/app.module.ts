import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { config } from 'process';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('EMAIL_USER'),
            pass: config.get('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: 'teamzuplyd@gmail.com',
        },
        template: {
          dir: 'D:\\Team Zuplyd\\zuplyd\\dist\\apps\\notification\\assets\\templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
