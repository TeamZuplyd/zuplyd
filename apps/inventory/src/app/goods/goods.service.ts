import { Injectable } from '@nestjs/common';
import mongoose, { Connection, Schema } from 'mongoose';

@Injectable()
export class GoodsService {
  connection: Connection;

  constructor() {
    this.connection = mongoose.createConnection('mongodb+srv://admin:WCWXJ2wOMHOgAjLs@cluster0.zazfmj0.mongodb.net/?retryWrites=true&w=majority');
  }

  async addItem(ownerId: string, qty: number, unitOfMeasure: string, itemName: string, itemType: any, itemDetails: any) {
    const itemSchema = await this.customSchemaGenaraterForItems(itemType);

    const itemModel = this.connection.model(itemName, itemSchema);

    let itemToAdd = {
      item_name: itemType.item_name,
      company_id: itemType.company_id,
      company_name: itemType.company_name,
      ownerId: ownerId,
      qty: qty,
      unitOfMeasure: unitOfMeasure,
    };

    itemToAdd = {
      ...itemToAdd,
      ...itemDetails,
    };

    const addedItem = await itemModel.create(itemToAdd);

    return addedItem;
  }

  //item definition need to be in inventory
  async customSchemaGenaraterForItems(createdItem: any): Promise<Schema> {
    const singleItemSchema = new mongoose.Schema(
      {
        item_name: 'string',
        company_id: 'string',
        company_name: 'string',
        ownerId: 'string',
        qty: 'number',
        unitOfMeasure: 'string',
      },
      { strict: false }
    );
    createdItem.attributes_array.forEach((element: string | number) => {
      let jsonObjForSchemaAdd = {};
      jsonObjForSchemaAdd[element] = 'string';
      singleItemSchema.add(jsonObjForSchemaAdd);
    });
    //console.log(singleItemSchema);
    return singleItemSchema;
  }
}
