import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import { FiShoppingCart } from 'react-icons/fi'; // Importando o ícone de carrinho

const HeaderContainer = styled.header`
    background: #ffffff;
    color: #00ff00;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    font-family: 'Consolas', 'Fira Code', monospace;
    
    @media (max-width: 768px) {
        padding: 1rem;
        position: sticky;
        top: 0;
        z-index: 100;
    }
`;

const Logo = styled(Link)`
    color: #1e3a8a;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 2px;
    position: relative;
    white-space: nowrap;

    &:before,
    &:after {
        content: '<';
        position: absolute;
        font-size: 1.2rem;
        top: 50%;
        transform: translateY(-50%);
    }

    &:before {
        left: -15px;
    }

    &:after {
        right: -15px;
        content: '>';
    }

    @media (max-width: 768px) {
        font-size: 1.2rem;
        letter-spacing: 1px;
        
        &:before {
            left: -12px;
        }
        
        &:after {
            right: -12px;
        }
    }

    @media (max-width: 480px) {
        font-size: 1rem;
        
        &:before,
        &:after {
            font-size: 0.9rem;
        }
        
        &:before {
            left: -10px;
        }
        
        &:after {
            right: -10px;
        }
    }
`;

const CartLink = styled(Link)`
    color: #1e3a8a;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    padding: 8px 12px;
    border: 1px solid #1e3a8a;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(0, 255, 0, 0.1);
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
        padding: 6px 10px;
    }

    @media (max-width: 480px) {
        padding: 6px;
        gap: 4px;
        
        span:first-child {
            display: none;
        }
    }
`;

const CartIcon = styled(FiShoppingCart)`
    font-size: 1.2rem;
    
    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;

const ItemCount = styled.span`
    background-color: #1e3a8a;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.8rem;
    min-width: 20px;
    text-align: center;
    
    @media (max-width: 480px) {
        padding: 2px 5px;
        font-size: 0.7rem;
    }
`;

const Header = () => {
    const { totalItems } = useCart();

    return (
        <HeaderContainer>
            <Logo to="/">
                devnology e-commerce
            </Logo>
            <CartLink to="/checkout">
                <CartIcon />
                <span>Carrinho</span>
                <ItemCount>{totalItems}</ItemCount>
            </CartLink>
        </HeaderContainer>
    );
};

export default Header;