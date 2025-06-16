import React from 'react';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutContainer = styled.div`
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const CheckoutHeader = styled.h2`
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
`;

const CartItem = styled.div`
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid #f5f5f5;
`;

const ItemImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #eee;
`;

const ItemDetails = styled.div`
    flex: 1;
`;

const ItemTitle = styled.h3`
    font-size: 1.1rem;
    margin: 0 0 0.5rem 0;
    color: #333;
`;

const ItemPrice = styled.p`
    color: #7f8c8d;
    margin: 0.3rem 0;
    font-size: 0.9rem;
`;

const QuantityControl = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.8rem 0;
`;

const QuantityButton = styled.button`
    width: 28px;
    height: 28px;
    border: 1px solid #ddd;
    background: #f9f9f9;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    transition: all 0.2s;

    &:hover {
        background: #eee;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: #e74c3c;
    cursor: pointer;
    font-size: 0.85rem;
    padding: 0;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: color 0.2s;

    &:hover {
        color: #c0392b;
        text-decoration: underline;
    }
`;

const SummarySection = styled.div`
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1.5rem; 
`;

const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const TotalRow = styled(SummaryRow)`
    font-size: 1.2rem;
    font-weight: 600;
    margin: 1.5rem 0;
`;

const ActionButton = styled.button`
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;
`;

const ClearButton = styled(ActionButton)`
    background: #f5f5f5;
    color: #e74c3c;
    border: 1px solid #e74c3c;

    &:hover {
        background: #ffecec;
    }
`;

const CheckoutButton = styled(ActionButton)`
    background: #27ae60;
    color: white;
    border: none;
    margin-left: 1rem;

    &:hover {
        background: #219955;
    }
`;

const EmptyCart = styled.div`
    text-align: center;
    padding: 3rem 0;
    color: #7f8c8d;
`;

const Checkout = () => {
    const {
        cart,
        totalPrice,
        removeFromCart,
        updateQuantity,
        clearCart
    } = useCart();

    const navigate = useNavigate();

    const handleClearCart = () => {
        if (window.confirm('Tem certeza que deseja limpar seu carrinho?')) {
            clearCart();
        }
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        navigate('/payment', {
            state: {
                total: totalPrice,
                items: cart
            }
        });
    };

    return (
        <CheckoutContainer>
            <CheckoutHeader>Finalizar Compra</CheckoutHeader>

            {cart.length === 0 ? (
                <EmptyCart>
                    <h3>Seu carrinho está vazio</h3>
                    <p>Adicione produtos para continuar</p>
                </EmptyCart>
            ) : (
                <>
                    <div>
                        {cart.map(item => (
                            <CartItem key={item.id}>
                                <ItemImage
                                    src={item.imageUrl || 'https://via.placeholder.com/100'}
                                    alt={item.name}
                                />
                                <ItemDetails>
                                    <ItemTitle>{item.name}</ItemTitle>
                                    <ItemPrice>Preço unitário: R$ {item.price.toFixed(2)}</ItemPrice>

                                    <QuantityControl>
                                        <QuantityButton
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </QuantityButton>
                                        <span>{item.quantity}</span>
                                        <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            +
                                        </QuantityButton>
                                    </QuantityControl>

                                    <ItemPrice>Subtotal: R$ {(item.price * item.quantity).toFixed(2)}</ItemPrice>

                                    <RemoveButton onClick={() => removeFromCart(item.id)}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                        Remover
                                    </RemoveButton>
                                </ItemDetails>
                            </CartItem>
                        ))}
                    </div>

                    <SummarySection>
                        <TotalRow>
                            <span>Total:</span>
                            <span>R$ {totalPrice.toFixed(2)}</span>
                        </TotalRow>
                        <ButtonContainer>
                            <ClearButton onClick={handleClearCart}>
                                Limpar Carrinho
                            </ClearButton>
                            <CheckoutButton onClick={handleCheckout}>
                                Finalizar Pedido
                            </CheckoutButton>
                        </ButtonContainer>
                    </SummarySection>
                </>
            )}
        </CheckoutContainer>
    );
};

export default Checkout;