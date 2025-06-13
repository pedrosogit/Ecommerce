import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../products/dto/create-order.dto';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.ordersService.createOrder(createOrderDto);
    }

    @Get()
    async findAll(): Promise<Order[]> {
        return this.ordersService.getAllOrders();
    }
}