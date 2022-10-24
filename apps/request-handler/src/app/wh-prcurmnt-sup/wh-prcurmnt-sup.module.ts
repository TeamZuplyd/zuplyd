import { Module } from '@nestjs/common';
import { WhPrcurmntSupService } from './wh-prcurmnt-sup.service';
import { WhPrcurmntSupController } from './wh-prcurmnt-sup.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WhPrcurmntSupReq, WhPrcurmntSupReqSchema } from './schemas/wh-prcurmnt-sup-req.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: WhPrcurmntSupReq.name, schema: WhPrcurmntSupReqSchema }])],
  providers: [WhPrcurmntSupService],
  controllers: [WhPrcurmntSupController],
})
export class WhPrcurmntSupModule {}
