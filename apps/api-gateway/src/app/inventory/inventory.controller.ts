import { Controller, Get, Param } from '@nestjs/common';
import axios from 'axios';

@Controller('inventoryAPI')
export class InventoryController {
  @Get('items/:company_id/:managing_id')
  async getItems(@Param('company_id') comp_id: string, @Param('managing_id') managing_id: string): Promise<any> {
    const res = await axios.get('http://localhost:7000/api/procurement/item/findAll/' + comp_id);
    const itemStructure = res.data.items;

    const results = await itemStructure.map(async (item) => {
      let temp = item;
      const tempID = item._id
      console.log()
      delete temp['__v'];
      delete temp['_id'];
      const body = {
        itemType: item,
        ownerId: managing_id,
      };

      try {
        const res2 = await axios.post('http://localhost:4444/api/goods/getItemStock', body);
        // const res3 = await axios.get('http://localhost:4321/api/shops/getItems/qwerty'); //managing_id
        
        const res3 = await axios.get(`http://localhost:4321/api/shops/getItems/${managing_id}`); //managing_id
        const obj = res3.data.items.find((i) => i.item_name === item.item_name);
        if (obj) return { ...item, min: obj.min, max: obj.max , totalStock : res2.data.totalStock, _id:tempID};
        else return { ...item, min: undefined, max: undefined, totalStock: res2.data.totalStock, _id: tempID };

      } catch (err) {
        console.log(err);
      }
    });

    const final_result = await Promise.all(results);
    const lowStockItems =final_result.filter((item) => item.min ? item.totalStock <= item.min :false);
    const allItems = final_result.filter((item) => item.min ? item.totalStock > item.min :true);

    return { allItems: allItems , lowStockItems : lowStockItems };
  }
}
