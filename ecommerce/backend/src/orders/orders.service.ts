import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
    ) {}

    async createOrder(items: { productId: string; name: string; price: number; quantity: number }[]) {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const order = this.ordersRepository.create({ items, total });
        return this.ordersRepository.save(order);
    }

    async getOrders() {
        return this.ordersRepository.find();
    }
}