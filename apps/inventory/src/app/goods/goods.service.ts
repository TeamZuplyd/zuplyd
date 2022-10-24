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
    if (this.connection.models[itemName]) {
      return this.connection.models[itemName];
    }
    return this.connection.model(itemName, itemSchema);
  }

  async itemTransfer(fromEntityId: string, toEntityId: string, transferQty: number, itemType: any) {
    const itemSchema = await this.customSchemaGenaraterForItems(itemType);

    const itemModel = await this.itemModel(itemType.item_name, itemSchema);

    const itemArr = itemModel.find({ ownerId: fromEntityId });

    let item = await itemArr.then((res) => {
      if (itemType.output_rule_type == 'minFirst') {
        res.sort(this.GetSortOrderMin(itemType.output_rule));
      } else {
        res.sort(this.GetSortOrderMax(itemType.output_rule));
      }
      return res[0];
    });

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

          transferObj = { ...item._doc, qty: transferQty, ownerId: toEntityId };

          delete transferObj._id;

          item = { ...item._doc, qty: item.qty - transferQty };

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

  async itemRelease(fromEntityId: string, releaseQty: number, itemType: any) {
    const itemSchema = await this.customSchemaGenaraterForItems(itemType);

    const itemModel = await this.itemModel(itemType.item_name, itemSchema);

    const itemArr = itemModel.find({ ownerId: fromEntityId });

    let item = await itemArr.then((res) => {
      if (itemType.output_rule_type == 'minFirst') {
        res.sort(this.GetSortOrderMin(itemType.output_rule));
      } else {
        res.sort(this.GetSortOrderMax(itemType.output_rule));
      }
      return res[0];
    });

    if (item.qty >= releaseQty) {
      item = { ...item._doc, qty: item.qty - releaseQty };
      console.log(item);
      return await itemModel.findByIdAndUpdate(item._id, item, {
        returnOriginal: false,
      });
    } else {
      return { error: 'Qty error' };
    }
  }

  async getItemsOfAnOwner(itemType: any, ownerId: string) {
    const itemSchema = await this.customSchemaGenaraterForItems(itemType);

    const itemModel = await this.itemModel(itemType.item_name, itemSchema);

    return itemModel.find({ ownerId: ownerId });
  }

  // async itemToBeReleased(itemModel: any, itemType: any, fromEntityId: string) {
  //   // const itemSchema = await this.customSchemaGenaraterForItems(itemType);

  //   // const itemModel = await this.itemModel(itemType.item_name, itemSchema);

  //   const itemArr = itemModel.find({ ownerId: fromEntityId });

  //   return itemArr;
  // }

  GetSortOrderMax(prop: string) {
    return function (a: string, b: string) {
      if (a[prop] < b[prop]) {
        return 1;
      } else if (a[prop] > b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  GetSortOrderMin(prop: string) {
    return function (a: string, b: string) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }
}
