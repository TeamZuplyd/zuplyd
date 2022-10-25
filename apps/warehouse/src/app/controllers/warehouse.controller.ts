import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Warehouse } from "../schemas/warehouse.schema";
import { WarehouseService } from "../services/warehouse.service";

@Controller('warehouses')
export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService){}

    @Post("createWarehouse")
    async createWarehouse(@Res() response, @Body() warehouse: Warehouse) {
        const newWarehouse = await this.warehouseService.create(warehouse);
        return response.status(HttpStatus.CREATED).json({
            newWarehouse
        })
    }
    @Get()
    getData() {
        return this.warehouseService.getData();
    }

    @Get("findAll")
    async fetchAll(@Res() response) {
        const warehouses = await this.warehouseService.readAll();
        return response.status(HttpStatus.OK).json({
            warehouses
        })
    }

    @Get('findById/:id')
    async findById(@Res() response, @Param('id') id) {
        const warehouse = await this.warehouseService.readById(id);
        return response.status(HttpStatus.OK).json({
            warehouse
        })
    }

    @Get('findByLocation/:location')
    async findByLocation(@Res() response, @Param('location') location) {
        const warehouse = await this.warehouseService.readByLocation(location);
        return response.status(HttpStatus.OK).json({
            warehouse
        })
    }

    @Get('findByManager/:manager')
    async findByManager(@Res() response, @Param('manager') manager) {
        const warehouse = await this.warehouseService.readByManager(manager);
        return response.status(HttpStatus.OK).json({
            warehouse
        })
    }

    @Get('findByCompany/:company')
    async findByCompany(@Res() response, @Param('company') company) {
        const warehouse = await this.warehouseService.readByCompany(company);
        return response.status(HttpStatus.OK).json({
            warehouse
        })
    }

    @Post('updateWarehouse/:id')
    async update(@Res() response, @Param('id') id, @Body() warehouse: Warehouse) {
        const updatedWarehouse = await this.warehouseService.update(id, warehouse);
        return response.status(HttpStatus.OK).json({
            updatedWarehouse
        })
    }

    @Post('deleteWarehouse/:id')
    async delete(@Res() response, @Param('id') id) {
        const deletedWarehouse = await this.warehouseService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedWarehouse
        })
    }
}