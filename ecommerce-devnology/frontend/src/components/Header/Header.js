import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';

const HeaderContainer = styled.header`
    background: #ffffff; /* Fundo branco para imitar o estilo da logo */
    color: #00ff00; /* Verde neon como na logo */
    padding: 1rem 2rem; /* Padding maior para um look mais espaçoso */
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra sutil para profundidade */
    font-family: 'Consolas', 'Fira Code', monospace; /* Fonte monoespaçada para estilo "code" */
`;

const Logo = styled(Link)`
    color: #1e3a8a;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 2px; /* Espaçamento para imitar o estilo da logo */
    position: relative;

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
`;

const CartLink = styled(Link)`
  color: #1e3a8a;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  padding: 5px 10px;
  border: 1px solid #1e3a8a;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 255, 0, 0.1); /* Hover sutil em verde claro */
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
                <span>Carrinho</span>
                <span>({totalItems})</span>
            </CartLink>
        </HeaderContainer>
    );
};

export default Header;