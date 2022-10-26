import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Shop } from "../schemas/shop.schema";
import { ShopService } from "../services/shop.service";
import { StoreItem } from "../schemas/storeitem.schema";

@Controller('shops')
export class ShopController {
    constructor(private readonly shopService: ShopService){}

    @Post("createShop")
    async createShop(@Res() response, @Body() shop: Shop) {
        const newShop = await this.shopService.create(shop);
        return response.status(HttpStatus.CREATED).json({
            newShop
        })
    }
    @Get()
    getData() {
        return this.shopService.getData();
    }

    @Get("findAll")
    async fetchAll(@Res() response) {
        const shops = await this.shopService.readAll();
        return response.status(HttpStatus.OK).json({
            shops
        })
    }

    @Get('findById/:id')
    async findById(@Res() response, @Param('id') id) {
        const shop = await this.shopService.readById(id);
        return response.status(HttpStatus.OK).json({
            shop
        })
    }

    @Get('findByLocation/:location')
    async findByLocation(@Res() response, @Param('location') location) {
        const shop = await this.shopService.readByLocation(location);
        return response.status(HttpStatus.OK).json({
            shop
        })
    }

    @Get('findByManager/:manager')
    async findByManager(@Res() response, @Param('manager') manager) {
        const shop = await this.shopService.readByManager(manager);
        return response.status(HttpStatus.OK).json({
            shop
        })
    }

    @Get('findByCompany/:company')
    async findByCompany(@Res() response, @Param('company') company) {
        const shop = await this.shopService.readByCompany(company);
        return response.status(HttpStatus.OK).json({
            shop
        })
    }

    @Post('updateShop/:id')
    async update(@Res() response, @Param('id') id, @Body() shop: Shop) {
        const updatedShop = await this.shopService.update(id, shop);
        return response.status(HttpStatus.OK).json({
            updatedShop
        })
    }

    @Post('deleteShop/:id')
    async delete(@Res() response, @Param('id') id) {
        const deletedShop = await this.shopService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedShop
        })
    }

    @Post('assignWarehouse/:id')
    async assignWarehouse(@Res() response, @Param('id') id, @Body() warehouse: {warehouse_id:string, warehouse_name:string}) {
        const updatedStoreItem = await this.shopService.assignWarehouse(id, warehouse);
        return response.status(HttpStatus.OK).json({
            updatedStoreItem
        })
    }

    @Post('unAssignWarehouse/:id/:warehouse_id')
    async unAssignWarehouse(@Res() response, @Param('id') id, @Param('warehouse_id') warehouse_id) {
        const updatedStoreItem = await this.shopService.unAssignWarehouse(id, warehouse_id);
        return response.status(HttpStatus.OK).json({
            updatedStoreItem
        })
    }

    //items

    @Get("getItems/:id")
    async fetchAllItems(@Res() response, @Param('id') id) {
        const items = await this.shopService.readAllItems(id);
        return response.status(HttpStatus.OK).json({
            items
        })
    }

    @Post("createItem")
    async createItem(@Res() response, @Body() storeitem: StoreItem) {
        const newStoreItem = await this.shopService.createItem(storeitem);
        return response.status(HttpStatus.CREATED).json({
            newStoreItem
        })
    }

    @Post('updateItem/:id')
    async updateItem(@Res() response, @Param('id') id, @Body() storeitem: StoreItem) {
        const updatedStoreItem = await this.shopService.updateItem(id, storeitem);
        return response.status(HttpStatus.OK).json({
            updatedStoreItem
        })
    }

    @Post('deleteItem/:id')
    async deleteItem(@Res() response, @Param('id') id) {
        const deletedItem = await this.shopService.deleteItem(id);
        return response.status(HttpStatus.OK).json({
            deletedItem
        })
    }
}