import { IsArray, IsDecimal, IsEmail, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
    productId: string;
    quantity: number;
}

export class CreateOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @IsDecimal()
    total: number;

    @IsOptional()
    @IsEmail()
    customerEmail?: string;
}