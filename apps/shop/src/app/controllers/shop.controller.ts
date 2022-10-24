import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Shop } from "../schemas/shop.schema";
import { ShopService } from "../services/shop.service";

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
}