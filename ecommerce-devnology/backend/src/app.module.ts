import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { AppController } from './app.controller';


@Module({
    controllers: [AppController],
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [Order],
            synchronize: true,
        }),
        ProductsModule,
        OrdersModule,
    ],
})
export class AppModule {}