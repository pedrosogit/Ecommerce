import React from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        try {
            await axios.post('http://localhost:3000/orders', { items: cart });
            clearCart();
            alert('Compra finalizada!');
        } catch (error) {
            console.error('Erro ao finalizar compra:', error);
            alert('Erro ao finalizar a compra. Tente novamente.');
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold">Carrinho</h2>
            {cart.length === 0 ? (
                <p>Carrinho vazio</p>
            ) : (
                <>
                    <ul>
                        {cart.map(item => (
                            <li key={item.productId} className="flex justify-between border-b py-2">
                                <span>{item.name} (x{item.quantity})</span>
                                <span>R$ {item.price * item.quantity}</span>
                                <button
                                    onClick={() => removeFromCart(item.productId)}
                                    className="text-red-500"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p className="text-xl mt-4">Total: R$ {total}</p>
                    <button
                        onClick={handleCheckout}
                        className="bg-green-500 text-white p-2 mt-4"
                    >
                        Finalizar Compra
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;