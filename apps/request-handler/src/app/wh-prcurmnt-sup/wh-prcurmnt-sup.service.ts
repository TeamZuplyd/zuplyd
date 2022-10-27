import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WhPrcurmntSupReq, WhPrcurmntSupReqDocument } from './schemas/wh-prcurmnt-sup-req.schema';
import { WhPrcurmntSupReqDto } from './dto/wh-prcurmnt-sup-req.dto';

@Injectable()
export class WhPrcurmntSupService {
  constructor(@InjectModel(WhPrcurmntSupReq.name) private WhPrcurmntSupReqModel: Model<WhPrcurmntSupReqDocument>) {}

  async findByRequestID(id: string): Promise<any> {
    return this.WhPrcurmntSupReqModel.findById(id).exec();
  }
  async createRequest(WhPrcurmntSupReqDto: WhPrcurmntSupReqDto): Promise<WhPrcurmntSupReq> {
    console.log(WhPrcurmntSupReqDto);
    const createdRequest = await this.WhPrcurmntSupReqModel.create(WhPrcurmntSupReqDto);
    return createdRequest;
  }

  async findAllByWarehouseID(warehouse_id: string): Promise<WhPrcurmntSupReq[]> {
    return this.WhPrcurmntSupReqModel.find({ warehouse_id: warehouse_id }).exec();
  }

  async findAllBySupplierIDAndCompany(supplier_id: string, company_id: string): Promise<WhPrcurmntSupReq[]> {
    return this.WhPrcurmntSupReqModel.find({
      company_id: company_id,
      suppliers: {
        $elemMatch: {
          _id: supplier_id,
        },
      },
    }).exec();
    // return this.WhPrcurmntSupReqModel.aggregate([
    //   {
    //     $match: {
    //       company_id: company_id,

    //     },
    //   },
    //   {
    //     $group: {
    //       _id: '$brand',
    //       count: { $sum: 1 },
    //     },
    //   },
    // ]).exec();
  }

  async findBySupplierIDGroupedToCompany(supplier_id: string): Promise<WhPrcurmntSupReq[]> {
    // return this.WhPrcurmntSupReqModel.find({
    //   company_name: 'ABDEF company',
    //   suppliers: {
    //     $elemMatch: {
    //       _id: supplier_id,
    //     },
    //   },
    // }).exec();
    return this.WhPrcurmntSupReqModel.aggregate([
      {
        $match: {
          suppliers: {
            $elemMatch: {
              _id: supplier_id,
            },
          },
        },
      },
      {
        $group: {
          _id: '$company_id',
          count: { $sum: 1 },
          company_name: { $push: '$company_name' },
        },
      },
    ]).exec();
  }

  async findAllByCompanyID(company_id: string): Promise<WhPrcurmntSupReq[]> {
    return this.WhPrcurmntSupReqModel.find({ company_id: company_id }).exec();
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
