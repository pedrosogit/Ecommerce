import React from 'react';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';

const CheckoutContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const CheckoutItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Checkout = () => {
    const {
        cart,
        totalPrice,
        removeFromCart,
        updateQuantity,
        clearCart
    } = useCart();

    return (
        <CheckoutContainer>
            <h2>Finalizar Compra</h2>
            {cart.length === 0 ? (
                <p>Seu carrinho está vazio</p>
            ) : (
                <>
                    <div>
                        {cart.map(item => (
                            <CheckoutItem key={item.id}>
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>Preço unitário: R$ {item.price.toFixed(2)}</p>
                                </div>
                                <div>
                                    <QuantityControls>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            +
                                        </button>
                                    </QuantityControls>
                                    <p>Subtotal: R$ {(item.price * item.quantity).toFixed(2)}</p>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={{ color: 'red', marginTop: '5px' }}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </CheckoutItem>
                        ))}
                    </div>
                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <h3>Total: R$ {totalPrice.toFixed(2)}</h3>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={clearCart}
                                style={{ backgroundColor: '#ff4444' }}
                            >
                                Limpar Carrinho
                            </button>
                            <button
                                onClick={() => alert('Pedido finalizado!')}
                                style={{ backgroundColor: '#00c851' }}
                            >
                                Finalizar Pedido
                            </button>
                        </div>
                    </div>
                </>
            )}
        </CheckoutContainer>
    );
};

export default Checkout;