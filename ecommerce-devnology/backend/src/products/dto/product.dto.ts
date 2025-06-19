export class ProductDto {
    id: string;
    name: string;
    description: string;
    price: number;
    provider: 'brazilian' | 'european';
    imageUrl?: string;
    category?: string;


    constructor(partial: Partial<ProductDto>) {
        Object.assign(this, partial);
    }
}