import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { filter, lastValueFrom, map } from 'rxjs';
import { FindAllResponse, Item, ItemIDRequest, ItemResponse, ItemServiceClient, ItemWithID, ITEM_SERVICE_NAME } from './procurement.pb';

@Controller('procurement/item')
export class ProcurementController {
  private procurementSVC: ItemServiceClient;

  @Inject(ITEM_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.procurementSVC = this.client.getService<ItemServiceClient>(ITEM_SERVICE_NAME);
  }

  @Post('create')
  private async create(@Body() itemData: Item): Promise<any> {
    return this.procurementSVC.create(itemData).pipe(
      map((res) => {
        const response: ItemResponse = {
          item: res.item,
          error: res.error,
        };
        return response;
      })
    );
  }

  @Get('findAll/:companyId')
  private async findAll(@Param('companyId') companyId: string): Promise<any> {
    let itemsArrObs = this.procurementSVC.findAll({});
    let itemsObj = await lastValueFrom(itemsArrObs);
    let arr = itemsObj.items.filter((val) => {
      if (val.company_id == companyId) {
        return val;
      }
    });

    return { items: arr };
  }

  @Get('findByName/:companyId/:itemName')
  private async findByName(@Param('companyId') companyId: string, @Param('itemName') itemName: string): Promise<any> {
    let itemsArrObs = this.procurementSVC.findAll({});
    let itemsObj = await lastValueFrom(itemsArrObs);
    let arr = itemsObj.items.filter((val) => {
      if (val.company_id == companyId) {
        return val;
      }
    });

    if (itemName != ':itemName') {
      console.log(itemName);
      arr = itemsObj.items.filter((val) => {
        if (val.item_name == itemName) {
          return val;
        }
      });
      return arr[0];
    }

    return { items: arr };
  }

  @Get('find/:id')
  private async findById(@Param() id: ItemIDRequest): Promise<any> {
    return this.procurementSVC.findByIdPublic(id).pipe(
      map((res) => {
        const response: ItemResponse = {
          item: res.item,
          error: res.error,
        };
        return response;
      })
    );
  }

  @Get('delete/:id')
  private async delete(@Param() id: ItemIDRequest): Promise<any> {
    return this.procurementSVC.delete(id).pipe(
      map((res) => {
        const response: ItemResponse = {
          item: res.item,
          error: res.error,
        };
        return response;
      })
    );
  }

  @Post('update')
  private async update(@Body() itemData: ItemWithID): Promise<any> {
    return this.procurementSVC.update(itemData).pipe(
      map((res) => {
        const response: ItemResponse = {
          item: res.item,
          error: res.error,
        };
        return response;
      })
    );
  }
}
