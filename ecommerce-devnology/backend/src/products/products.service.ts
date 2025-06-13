import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto';
import axios from 'axios';

@Injectable()
export class ProductsService {
    private readonly brazilianProviderUrl = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
    private readonly europeanProviderUrl = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

    async getAllProducts(): Promise<ProductDto[]> {
        try {
            const [brazilianProducts, europeanProducts] = await Promise.all([
                this.fetchProducts(this.brazilianProviderUrl, 'brazilian'),
                this.fetchProducts(this.europeanProviderUrl, 'european'),
            ]);

            return [...brazilianProducts, ...europeanProducts];
        } catch (error) {
            throw new Error(`Failed to fetch products: ${error.message}`);
        }
    }

    async getProductById(id: string): Promise<ProductDto> {
        try {
            // Tenta encontrar em ambos os fornecedores
            const [brazilianProduct, europeanProduct] = await Promise.all([
                this.fetchProductById(this.brazilianProviderUrl, id, 'brazilian'),
                this.fetchProductById(this.europeanProviderUrl, id, 'european'),
            ]);

            return brazilianProduct || europeanProduct || null;
        } catch (error) {
            throw new Error(`Failed to fetch product by ID: ${error.message}`);
        }
    }

    private async fetchProducts(url: string, provider: 'brazilian' | 'european'): Promise<ProductDto[]> {
        const response = await axios.get(url);
        return response.data.map(item => this.transformProduct(item, provider));
    }

    private async fetchProductById(
        baseUrl: string,
        id: string,
        provider: 'brazilian' | 'european'
    ): Promise<ProductDto | null> {
        try {
            const response = await axios.get(`${baseUrl}/${id}`);
            return this.transformProduct(response.data, provider);
        } catch (error) {
            if (error.response?.status === 404) {
                return null; // Produto não encontrado neste fornecedor
            }
            throw error;
        }
    }

    private transformProduct(product: any, provider: 'brazilian' | 'european'): ProductDto {
        // Transformação para o fornecedor brasileiro
        if (provider === 'brazilian') {
            return {
                id: product.id,
                name: product.nome || product.name,
                description: product.descricao || product.description,
                price: parseFloat(product.preco || product.price),
                provider: 'brazilian',
                imageUrl: product.imagem || product.imageUrl,
                category: product.categoria || product.category,
            };
        }

        // Transformação para o fornecedor europeu
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: parseFloat(product.price),
            provider: 'european',
            imageUrl: product.imageUrl,
            category: product.category,
        };
    }
}