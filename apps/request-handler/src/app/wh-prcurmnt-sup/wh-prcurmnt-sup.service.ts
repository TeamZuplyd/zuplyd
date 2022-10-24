import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WhPrcurmntSupReq, WhPrcurmntSupReqDocument } from './schemas/wh-prcurmnt-sup-req.schema';
import { WhPrcurmntSupReqDto } from './dto/wh-prcurmnt-sup-req.dto';

@Injectable()
export class WhPrcurmntSupService {
  constructor(@InjectModel(WhPrcurmntSupReq.name) private WhPrcurmntSupReqModel: Model<WhPrcurmntSupReqDocument>) {}

  async createRequest(WhPrcurmntSupReqDto: WhPrcurmntSupReqDto): Promise<WhPrcurmntSupReq> {
    const createdRequest = await this.WhPrcurmntSupReqModel.create(WhPrcurmntSupReqDto);
    return createdRequest;
  }

  async findAllByWarehouseID(warehouse_id: string): Promise<WhPrcurmntSupReq[]> {
    return this.WhPrcurmntSupReqModel.find({ warehouse_id: warehouse_id }).exec();
  }

  async findAllBySupplierID(supplier_id: string): Promise<WhPrcurmntSupReq[]> {
    return this.WhPrcurmntSupReqModel.find({ supplier_id: supplier_id }).exec();
  }

  async findAllByAny(searchParamObj: any): Promise<WhPrcurmntSupReq[]> {
    return this.WhPrcurmntSupReqModel.find(searchParamObj).exec();
  }

  async delete(id: string) {
    const deletedWhPrcurmntSupReq = await this.WhPrcurmntSupReqModel.findOneAndRemove({ _id: id }).exec();
    return deletedWhPrcurmntSupReq;
  }

  async update(id: string, WhPrcurmntSupReq: WhPrcurmntSupReq): Promise<WhPrcurmntSupReq> {
    return await this.WhPrcurmntSupReqModel.findByIdAndUpdate(id, WhPrcurmntSupReq, {
      returnOriginal: false,
    });
  }

  async findAllDev(): Promise<WhPrcurmntSupReq[]> {
    return this.WhPrcurmntSupReqModel.find().exec();
  }
}
