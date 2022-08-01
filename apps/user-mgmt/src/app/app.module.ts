import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:fyDl5TP8g8DGc25G@zuplyd-test.eedi1.mongodb.net/?retryWrites=true&w=majority',
    ),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
  exports: [AppService],
})
export class AppModule {}
