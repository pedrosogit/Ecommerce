import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
    constructor(private readonly httpService: HttpService) {}

    async getAllProducts() {
        const brazilianUrl = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
        const europeanUrl = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

        const [brazilian, european] = await Promise.all([
            firstValueFrom(this.httpService.get(brazilianUrl)).then(res => res.data),
            firstValueFrom(this.httpService.get(europeanUrl)).then(res => res.data),
        ]);

        return [
            ...brazilian.map(p => ({ id: p.id, name: p.nome, price: p.preco, provider: 'Brazilian' })),
            ...european.map(p => ({ id: p.id, name: p.name, price: p.price, provider: 'European' })),
        ];
    }

    async getProductById(provider: string, id: string) {
        const baseUrl = provider === 'Brazilian'
            ? 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider'
            : 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';
        const response = await firstValueFrom(this.httpService.get(`${baseUrl}/${id}`));
        const product = response.data;
        return provider === 'Brazilian'
            ? { id: product.id, name: product.nome, price: product.preco, provider }
            : { id: product.id, name: product.name, price: product.price, provider };
    }
}