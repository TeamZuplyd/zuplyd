import { Module } from '@nestjs/common';
import { SetupManagersService } from './setup-managers.service';
import { SetupManagersController } from './setup-managers.controller';

@Module({
  providers: [SetupManagersService],
  controllers: [SetupManagersController],
})
export class SetupManagersModule {}
