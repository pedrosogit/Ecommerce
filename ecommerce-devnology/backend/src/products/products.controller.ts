import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto';
import { ImagesService } from './images.service';


@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService
, private readonly imagesService: ImagesService
    ) {}
    

    @Get(':id/image')
    async getProductImage(@Param('id') id: string) {
        return this.imagesService.getImageFromProvider(id, 'brazilian');
    }

    @Get()
    async findAll(): Promise<ProductDto[]> {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ProductDto> {
        return this.productsService.getProductById(id);
    }

}