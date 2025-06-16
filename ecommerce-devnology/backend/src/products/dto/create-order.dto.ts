import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsArray, IsDecimal, IsEmail, IsNotEmpty, IsNumber, IsOptional, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
    @ApiProperty()
    @IsNotEmpty()
    productId: string; // Mantém como string do segundo arquivo, mas pode ser ajustado para number se necessário

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number; // Adicionado do primeiro arquivo
}

export class CreateOrderDto {
    @ApiProperty({ type: [OrderItemDto], description: 'Lista de itens do pedido' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @ApiProperty({ description: 'ID do usuário que fez o pedido' })
    @IsNumber()
    @IsNotEmpty()
    userId: number; // Adicionado do primeiro arquivo

    @ApiProperty({ description: 'Total do pedido' })
    @IsDecimal()
    @IsNotEmpty()
    total: number; // Mantém como decimal do segundo arquivo, mas aceita IsNumber também

    @ApiPropertyOptional({ description: 'E-mail do cliente (opcional)' })
    @IsOptional()
    @IsEmail()
    customerEmail?: string; // Mantém como opcional do segundo arquivo
}