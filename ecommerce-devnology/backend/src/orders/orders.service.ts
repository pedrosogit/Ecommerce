import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from '../products/dto/create-order.dto';
import { PaginationDto } from './common/dto/pagination.dto';
import { FindOptionsWhere } from 'typeorm';

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

    async findAll({
                      page,
                      limit,
                      status,
                  }: {
        page: number;
        limit: number;
        status?: 'pending' | 'completed' | 'cancelled';
    }): Promise<PaginationDto<Order>> {
        const where: FindOptionsWhere<Order> = {};
        if (status) {
            where.status = status;
        }

        const [results, total] = await this.ordersRepository.findAndCount({
            where,
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        return {
            data: results,
            total,
            page,
            last_page: Math.ceil(total / limit),
        };
    }

    async findByUser(
        userId: number,
        { page, limit }: { page: number; limit: number },
    ): Promise<PaginationDto<Order>> {
        const [results, total] = await this.ordersRepository.findAndCount({
            where: { userId } as FindOptionsWhere<Order>, // Tipagem explícita
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        return {
            data: results,
            total,
            page,
            last_page: Math.ceil(total / limit),
        };
    }

    async findOne(id: number): Promise<Order> {
        const order = await this.ordersRepository.findOne({
            where: { id } as FindOptionsWhere<Order>, // Tipagem explícita
        });
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }

    async findByNumber(orderNumber: string): Promise<Order> {
        const order = await this.ordersRepository.findOne({
            where: { orderNumber } as FindOptionsWhere<Order>, // Tipagem explícita
        });
        if (!order) {
            throw new NotFoundException(`Order with number ${orderNumber} not found`);
        }
        return order;
    }
}