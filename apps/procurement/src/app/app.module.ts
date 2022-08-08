import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';

@Module({
  imports: [ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
