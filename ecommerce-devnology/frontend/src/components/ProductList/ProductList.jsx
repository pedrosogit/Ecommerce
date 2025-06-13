import React from 'react';
import ProductCard from '../ProductCard/ProductCard.tsx';

const ProductList = ({ products }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            padding: '20px'
        }}>
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
};

export default ProductList;