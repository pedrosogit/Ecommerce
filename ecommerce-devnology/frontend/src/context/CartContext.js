import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Verificação para SSR (Next.js) e navegador
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    // Persistência no localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    // Adiciona com validação de estoque
    const addToCart = (product, availableStock) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);

            // Verifica estoque
            if (existingItem && existingItem.quantity >= availableStock) {
                return prevCart;
            }

            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Remove com animação (opcional)
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    // Atualiza quantidade com validação
    const updateQuantity = (productId, newQuantity, availableStock) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }

        if (newQuantity > availableStock) {
            alert(`Só temos ${availableStock} unidades em estoque`);
            return;
        }

        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Limpa com confirmação
    const clearCart = () => {
        if (cart.length > 0 && window.confirm('Tem certeza que deseja limpar o carrinho?')) {
            setCart([]);
        }
    };

    // Cálculos
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};