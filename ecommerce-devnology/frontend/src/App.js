import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Checkout from './pages/Checkout/Checkout';
import Header from './components/Header/Header';
import Payment from './pages/payment';

function App() {
    return (
        <Router>
            <CartProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment" element={<Payment />} />
                </Routes>
            </CartProvider>
        </Router>
    );
}

export default App;