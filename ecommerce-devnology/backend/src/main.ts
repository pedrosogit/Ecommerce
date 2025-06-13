import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Habilite CORS com configurações específicas
    app.enableCors({
        origin: 'http://localhost:3001', // Ou '*' para permitir qualquer origem (não recomendado para produção)
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept',
        credentials: true,
    });

    await app.listen(3000);
}
bootstrap();