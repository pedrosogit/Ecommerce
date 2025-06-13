export class ProductDto {
    id: string;
    name: string;
    description: string;
    price: number;
    provider: 'brazilian' | 'european';
    imageUrl?: string;  // campo opcional
    category?: string;  // campo opcional

    // Adicione um construtor para facilitar a criação
    constructor(partial: Partial<ProductDto>) {
        Object.assign(this, partial);
    }
}