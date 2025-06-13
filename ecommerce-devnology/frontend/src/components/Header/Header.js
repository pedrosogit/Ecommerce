import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';

const HeaderContainer = styled.header`
  background: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Header = () => {
    const { totalItems } = useCart();

    return (
        <HeaderContainer>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                <h1>Devnology E-commerce</h1>
            </Link>
            <CartLink to="/checkout">
                <span>Carrinho</span>
                <span>({totalItems})</span>
            </CartLink>
        </HeaderContainer>
    );
};

export default Header;