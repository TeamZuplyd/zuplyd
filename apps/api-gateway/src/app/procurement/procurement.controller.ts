import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Item, ItemIDRequest, ItemResponse, ItemServiceClient, ItemWithID, ITEM_SERVICE_NAME } from './procurement.pb';

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

  @Get('findAll')
  private async findAll(): Promise<any> {
    return this.procurementSVC.findAll({});
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
