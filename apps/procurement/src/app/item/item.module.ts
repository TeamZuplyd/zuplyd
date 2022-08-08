import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';

@Module({
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
