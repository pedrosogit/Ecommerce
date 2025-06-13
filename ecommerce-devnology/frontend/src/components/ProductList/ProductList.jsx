import ProductCard from '../ProductCard/ProductCard.tsx';
import styled from 'styled-components';

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
`;

function ProductList({ products }) {
    return (
        <ProductsGrid>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </ProductsGrid>
    );
}
export default ProductList;