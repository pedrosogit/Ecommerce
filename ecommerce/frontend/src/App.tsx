import React from 'react';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App: React.FC = () => {
  return (
      <CartProvider>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">E-commerce Devnology</h1>
          <ProductList />
          <Cart />
        </div>
      </CartProvider>
  );
};

export default App;