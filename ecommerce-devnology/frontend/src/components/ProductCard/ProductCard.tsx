import React from 'react';
import { useCart } from '../../context/CartContext';
interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    description?: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart(); // Pegamos a função addToCart do contexto

    return (
        <div className="product-card" style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '8px',
            maxWidth: '300px'
        }}>
            {product.imageUrl && (
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                    }}
                />
            )}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Preço: R$ {product.price.toFixed(2)}</strong></p>
            <button
                onClick={() => addToCart(product)} // Adiciona o produto ao carrinho
                style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Adicionar ao Carrinho
            </button>
        </div>
    );
};

export default ProductCard;