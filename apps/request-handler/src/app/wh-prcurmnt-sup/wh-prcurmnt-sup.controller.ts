import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WhPrcurmntSupReqDto } from './dto/wh-prcurmnt-sup-req.dto';
import { WhPrcurmntSupService } from './wh-prcurmnt-sup.service';

@Controller('wh-prcurmnt-sup')
export class WhPrcurmntSupController {
  constructor(private readonly WhPrcurmntSupReqService: WhPrcurmntSupService) {}

  @Post('createRequest')
  createRequest(@Body() WhPrcurmntSupReqDto: WhPrcurmntSupReqDto) {
    return this.WhPrcurmntSupReqService.createRequest(WhPrcurmntSupReqDto);
  }

  @Get('findByRequestID/:id')
  findByRequestID(@Param('id') id: string) {
    return this.WhPrcurmntSupReqService.findByRequestID(id);
  }

  @Get('findAllByWarehouseID/:id')
  findAllByWarehouseID(@Param('id') id: string) {
    return this.WhPrcurmntSupReqService.findAllByWarehouseID(id);
  }

  @Get('findAllBySupplierID/:id')
  findAllBySupplierIDGroup(@Param('id') id: string) {
    // const goodsRequests = this.WhPrcurmntSupReqService.findAllDev();

    // goodsRequests.filter((goodsRequest) => {})

    return this.WhPrcurmntSupReqService.findBySupplierIDGroupedToCompany(id);
  }

  @Get('findAllBySupplierIDAndCompany/:compId/:supId')
  findAllBySupplierIDAndCompany(@Param('compId') compId: string, @Param('supId') supId: string) {
    // const goodsRequests = this.WhPrcurmntSupReqService.findAllDev();

    // goodsRequests.filter((goodsRequest) => {})

    return this.WhPrcurmntSupReqService.findAllBySupplierIDAndCompany(supId, compId);
  }

  // @Get('findAllByCompanyID/:id')
  // findAllByCompanyID(@Param('id') id: string) {
  //   return this.WhPrcurmntSupReqService.findAllBySupplierID(id);
  // }

  @Get('findAllByAny')
  findAllByAny(@Body() searchParamObj: any) {
    /*
    searchParamObj = { key : value }
    */
    return this.WhPrcurmntSupReqService.findAllByAny(searchParamObj);
  }

  @Get('delete/:id')
  delete(@Param('id') id: string) {
    return this.WhPrcurmntSupReqService.delete(id);
  }

  @Post('update')
  update(@Body() WhPrcurmntSupReq: any) {
    return this.WhPrcurmntSupReqService.update(WhPrcurmntSupReq._id, WhPrcurmntSupReq);
  }

  @Get('findAllDev')
  findAllDev() {
    return this.WhPrcurmntSupReqService.findAllDev();
  }
}
