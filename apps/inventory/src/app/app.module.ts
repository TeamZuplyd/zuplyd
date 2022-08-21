import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodsModule } from './goods/goods.module';

@Module({
  imports: [GoodsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
