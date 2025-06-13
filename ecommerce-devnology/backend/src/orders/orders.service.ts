import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from '../products/dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
    ) {}

    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        const order = this.ordersRepository.create(createOrderDto);
        return this.ordersRepository.save(order);
    }

    async getAllOrders(): Promise<Order[]> {
        return this.ordersRepository.find();
    }
}