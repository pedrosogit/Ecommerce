import React from 'react';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../api/products';

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

const Checkout = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const [orderSuccess, setOrderSuccess] = useState(false);

    const handleCheckout = async () => {
        try {
            const orderData = {
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    name: item.name
                })),
                total: totalPrice
            };

            await createOrder(orderData);
            clearCart();
            setOrderSuccess(true);
        } catch (error) {
            console.error('Checkout error:', error);
        }
    };

    if (orderSuccess) {
        return (
            <CheckoutContainer>
                <h2>Pedido realizado com sucesso!</h2>
                <p>Obrigado por sua compra.</p>
            </CheckoutContainer>
        );
    }

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
                                    <p>Quantidade: {item.quantity}</p>
                                </div>
                                <div>
                                    <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </CheckoutItem>
                        ))}
                    </div>
                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <h3>Total: R$ {totalPrice.toFixed(2)}</h3>
                        <button onClick={handleCheckout}>Finalizar Pedido</button>
                    </div>
                </>
            )}
        </CheckoutContainer>
    );
};

export default Checkout;