import { Injectable } from '@nestjs/common';
import mongoose, { Connection, Model, Schema } from 'mongoose';

@Injectable()
export class GoodsService {
  connection: Connection;

  constructor() {
    this.connection = mongoose.createConnection('mongodb+srv://admin:WCWXJ2wOMHOgAjLs@cluster0.zazfmj0.mongodb.net/?retryWrites=true&w=majority');
  }

  async addItem(ownerId: string, qty: number, itemName: string, itemType: any, itemDetails: any) {
    const itemSchema = await this.customSchemaGenaraterForItems(itemType);

    // const itemModel = this.connection.model(itemName, itemSchema);
    const itemModel = this.itemModel(itemName, itemSchema);

    let itemToAdd = {
      item_name: itemType.item_name,
      company_id: itemType.company_id,
      company_name: itemType.company_name,
      ownerId: ownerId,
      qty: qty,
      unitOfMeasure: itemType.unitOfMeasure,
    };

    itemToAdd = {
      ...itemToAdd,
      ...itemDetails,
    };

    const addedItem = await (await itemModel).create(itemToAdd);

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

  //model creation based on the item type so that specific collection can be accessed
  async itemModel(itemName: string, itemSchema: Schema): Promise<Model<any>> {
    return this.connection.model(itemName, itemSchema);
  }

  async itemTransfer(item: any, toEntityId: string, transferQty: number, itemType: any) {
    const itemSchema = await this.customSchemaGenaraterForItems(itemType);

    const itemModel = await this.itemModel(item.item_name, itemSchema);

    if (item.qty == transferQty) {
      item = { ...item, ownerId: toEntityId };
      return await itemModel.findByIdAndUpdate(item._id, item, {
        returnOriginal: false,
      });
    } else {
      let session = null;
      let transferObj = null;
      this.connection
        .startSession()
        .then((_session) => {
          session = _session;

          session.startTransaction();

          transferObj = { ...item, qty: transferQty, ownerId: toEntityId };
          delete transferObj._id;

          item = { ...item, qty: item.qty - transferQty };

          return itemModel.findByIdAndUpdate(item._id, item, {
            returnOriginal: false,
            session: session,
          });
        })
        .then(() => itemModel.create([transferObj], { session: session }))
        .then(() => session.commitTransaction())
        .then(() => session.endSession());
    }
  }

  async itemRelease(item: any, releaseQty: number, itemType: any) {
    const itemSchema = await this.customSchemaGenaraterForItems(itemType);

    const itemModel = await this.itemModel(item.item_name, itemSchema);

    if (item.qty >= releaseQty) {
      item = { ...item, qty: item.qty - releaseQty };
      return await itemModel.findByIdAndUpdate(item._id, item, {
        returnOriginal: false,
      });
    } else {
      return { error: 'Qty error' };
    }
  }

  async itemToBeReleased(item: any, itemType: any) {
    const itemSchema = await this.customSchemaGenaraterForItems(itemType);

    const itemModel = await this.itemModel(item.item_name, itemSchema);

    return itemModel.find({});
  }
}
