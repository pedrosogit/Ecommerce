import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async create(@Body() orderData: { items: { productId: string; name: string; price: number; quantity: number }[] }) {
        return this.ordersService.createOrder(orderData.items);
    }

    @Get()
    async getAll() {
        return this.ordersService.getOrders();
    }
}