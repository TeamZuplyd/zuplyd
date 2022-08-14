import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserMgmtModule } from './user-mgmt/user-mgmt.module';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [UserMgmtModule, AuthzModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
