import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'database.sqlite',
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        OrdersModule,
        ProductsModule,
        HttpModule,
    ],
})
export class AppModule {}