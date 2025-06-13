import React from 'react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { cart, addToCart } = useCart();
    const [added, setAdded] = React.useState(false);
    const [stock] = React.useState(10); // Exemplo - substitua pela propriedade real do produto

    const handleAddToCart = () => {
        const cartItem = cart.find(item => item.id === product.id);
        const currentQuantity = cartItem ? cartItem.quantity : 0;

        if (currentQuantity >= stock) {
            alert(`Não há mais estoque disponível para ${product.name}`);
            return;
        }

        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '8px',
            maxWidth: '300px',
            position: 'relative'
        }}>
            {stock <= 3 && (
                <span style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    padding: '3px 6px',
                    borderRadius: '4px',
                    fontSize: '12px'
                }}>
                    Últimas unidades!
                </span>
            )}

            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Preço: R$ {product.price.toFixed(2)}</strong></p>
            <p>Disponível: {stock} unidades</p>

            <button
                onClick={handleAddToCart}
                disabled={stock === 0}
                style={{
                    backgroundColor: added ? '#00c851' : stock === 0 ? '#cccccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: stock === 0 ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s'
                }}
            >
                {stock === 0 ? 'Esgotado' : added ? '✔ Adicionado' : 'Adicionar ao Carrinho'}
            </button>
        </div>
    );
};

export default ProductCard;