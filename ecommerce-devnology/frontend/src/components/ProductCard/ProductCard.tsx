import { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';

// Interface para o produto
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock?: number;
}

// Props do ProductCard
interface ProductCardProps {
    product: Product;
}

// Props do botão estilizado
interface AddToCartButtonProps {
    added?: boolean;
    disabled?: boolean;
}

const Card = styled.div`
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 15px;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    position: relative;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
`;

const StockWarning = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ff4444;
    color: white;
    padding: 3px 6px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
`;

const ProductName = styled.h3`
    font-size: 1.1rem;
    color: #1e3a8a;
    margin: 10px 0;
    font-weight: 500;
`;

const ProductDescription = styled.p`
    font-size: 0.9rem;
    color: #64748b;
    margin-bottom: 10px;
    line-height: 1.4;
`;

const ProductPrice = styled.p`
    font-size: 1rem;
    color: #64748b;
    font-weight: 500;
    margin-bottom: 10px;
`;

const StockInfo = styled.p`
    font-size: 0.85rem;
    color: #64748b;
    margin-bottom: 10px;
`;

const AddToCartButton = styled.button<AddToCartButtonProps>`
    padding: 8px 16px;
    background-color: ${props => (props.added ? '#00c851' : props.disabled ? '#cccccc' : '#3b82f6')};
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    transition: background-color 0.3s ease;

    &:hover:not(:disabled) {
        background-color: ${props => (props.added ? '#00b843' : '#2563eb')};
    }
`;

const ProductCard = ({ product }: ProductCardProps) => {
    const { cart, addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const [stock] = useState(product.stock || 10);

    const handleAddToCart = () => {
        const cartItem = cart.find(item => item.id === product.id);
        const currentQuantity = cartItem ? cartItem.quantity : 0;

        if (currentQuantity >= stock) {
            alert(`Não há mais estoque disponível para ${product.name}`);
            return;
        }

        addToCart(product, stock);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <Card>
            {stock <= 3 && <StockWarning>Últimas unidades!</StockWarning>}
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice><strong>Preço: R$ {product.price.toFixed(2)}</strong></ProductPrice>
            <StockInfo>Disponível: {stock} unidades</StockInfo>
            <AddToCartButton
                onClick={handleAddToCart}
                disabled={stock === 0}
                added={added}
            >
                {stock === 0 ? 'Esgotado' : added ? '✔ Adicionado' : 'Adicionar ao Carrinho'}
            </AddToCartButton>
        </Card>
    );
};

export default ProductCard;