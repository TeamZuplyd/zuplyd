import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserMgmtModule } from './user-mgmt/user-mgmt.module';

@Module({
  imports: [UserMgmtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
