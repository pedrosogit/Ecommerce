import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ImagesService } from './images.service';

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        CacheModule.register({
            ttl: 60 * 5, // 5 minutos de cache
        }),
    ],
    controllers: [ProductsController],
    providers: [ProductsService, ImagesService],
    exports: [ProductsService],
})
export class ProductsModule {}