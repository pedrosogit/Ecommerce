import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async findAll(): Promise<ProductDto[]> {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ProductDto> {
        return this.productsService.getProductById(id);
    }
}