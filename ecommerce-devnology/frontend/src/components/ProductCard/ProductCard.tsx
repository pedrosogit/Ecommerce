import React from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="product-card" style={{ border: '1px solid #ddd', padding: '16px', margin: '8px' }}>
            {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            )}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Preço: R$ {product.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default ProductCard;