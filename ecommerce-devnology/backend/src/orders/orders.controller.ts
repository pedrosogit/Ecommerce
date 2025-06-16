import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    UsePipes,
    ValidationPipe,
    NotFoundException,
    ParseIntPipe,
    DefaultValuePipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from '../products/dto/create-order.dto';
import { PaginationDto } from './common/dto/pagination.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
@UsePipes(new ValidationPipe({ transform: true }))
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @ApiOperation({ summary: 'Criar um novo pedido' })
    @ApiResponse({ status: 201, description: 'Pedido criado com sucesso', type: Order })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        const order = await this.ordersService.createOrder(createOrderDto); // Adicionado await
        if (!order) {
            throw new NotFoundException('Order creation failed');
        }
        return order;
    }

    @Get()
    @ApiOperation({ summary: 'Obter todos os pedidos com paginação' })
    @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
    @ApiQuery({ name: 'status', type: String, required: false, enum: ['pending', 'completed', 'cancelled'] })
    @ApiResponse({ status: 200, description: 'Lista de pedidos', type: PaginationDto })
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('status') status?: 'pending' | 'completed' | 'cancelled',
    ): Promise<PaginationDto<Order>> { // Corrigido para PaginationDto<Order>
        return this.ordersService.findAll({ page, limit, status });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obter um pedido por ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Pedido encontrado', type: Order })
    @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
    async findOne(@Param('id', ParseIntPipe) id: number) { // Adicionado ParseIntPipe
        return this.ordersService.findOne(id);
    }

    @Get('number/:orderNumber')
    @ApiOperation({ summary: 'Obter um pedido por número' })
    @ApiParam({ name: 'orderNumber', type: String })
    @ApiResponse({ status: 200, description: 'Pedido encontrado', type: Order })
    @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
    async findByNumber(@Param('orderNumber') orderNumber: string) {
        return this.ordersService.findByNumber(orderNumber);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Obter pedidos por usuário com paginação' })
    @ApiParam({ name: 'userId', type: Number })
    @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
    @ApiResponse({ status: 200, description: 'Lista de pedidos do usuário', type: PaginationDto })
    async findByUser(
        @Param('userId', ParseIntPipe) userId: number, // Adicionado ParseIntPipe
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, // Corrigido para usar ParseIntPipe
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, // Corrigido para usar ParseIntPipe
    ): Promise<PaginationDto<Order>> { // Corrigido para PaginationDto<Order>
        return this.ordersService.findByUser(userId, { page, limit });
    }
}