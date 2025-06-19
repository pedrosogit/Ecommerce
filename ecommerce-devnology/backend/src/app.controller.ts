import { Controller, Get } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators';

@Controller()
export class AppController {
    @Get()
    getStatus(@Res() res) {
        res.send(`
            <html>
                <head>
                    <title>Backend Online</title>
                    <style>
                        body { font-family: Arial; text-align: center; margin-top: 50px; }
                        h1 { color: #2c3e50; }
                        .status { color: #27ae60; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <h1>Backend NestJS</h1>
                    <p>Servidor rodando na porta <strong>3000</strong>!</p>
                    <p class="status">Status: ONLINE ✅</p>
                </body>
            </html>
        `);
    }
}