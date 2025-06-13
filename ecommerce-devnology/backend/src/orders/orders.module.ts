// orders.module.ts
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // Importe do NestJS

@Module({
    // ...
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe, // Pipe de validação global
        },
    ],
})
export class OrdersModule {}