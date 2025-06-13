import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductList from '../../components/ProductList/ProductList';
import { getProducts } from '../../api/products';

const Container = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

const SearchContainer = styled.div`
    margin: 20px 0;
    display: flex;
    gap: 10px;
`;

const SearchInput = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex-grow: 1;
    font-size: 16px;
`;

const FilterSelect = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 16px;
`;

const LoadingMessage = styled.div`
  padding: 40px;
  text-align: center;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  padding: 20px;
  background: #ffecec;
  color: #ff0000;
  border-radius: 4px;
  text-align: center;

  button {
    margin-top: 10px;
    padding: 5px 10px;
    background: #ff0000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;

        // Aplica filtro de busca
        if (searchTerm) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Aplica filtro de categoria/fornecedor
        if (filter !== 'all') {
            result = result.filter(product => product.provider === filter);
        }

        setFilteredProducts(result);
    }, [searchTerm, filter, products]);

    if (loading) return (
        <Container>
            <h1>Produtos Disponíveis</h1>
            <LoadingMessage>⏳ Carregando produtos...</LoadingMessage>
        </Container>
    );

    if (error) return (
        <Container>
            <h1>Produtos Disponíveis</h1>
            <ErrorMessage>
                ❌ Erro ao carregar produtos: {error}
                <button onClick={() => window.location.reload()}>Tentar novamente</button>
            </ErrorMessage>
        </Container>
    );

    return (
        <Container>
            <h1>Produtos Disponíveis</h1>

            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <FilterSelect
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">Todos</option>
                    <option value="brazilian">Fornecedor Brasileiro</option>
                    <option value="european">Fornecedor Europeu</option>
                </FilterSelect>
            </SearchContainer>

            {filteredProducts.length === 0 ? (
                <p>Nenhum produto encontrado com os filtros selecionados.</p>
            ) : (
                <ProductList products={filteredProducts} />
            )}
        </Container>
    );
};

export default Home;