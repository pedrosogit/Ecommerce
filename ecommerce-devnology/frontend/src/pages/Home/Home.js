import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductList from '../../components/ProductList/ProductList';
import { getProducts } from '../../api/products';

// Container principal responsivo
const Container = styled.div`
    padding: 20px 15px;
    max-width: 1200px;
    margin: 0 auto;
    background: #f9fafb;
    min-height: 100vh;

    @media (min-width: 768px) {
        padding: 40px 20px;
    }
`;

// Header responsivo
const Header = styled.header`
    text-align: center;
    margin-bottom: 30px;

    @media (min-width: 768px) {
        margin-bottom: 40px;
    }
`;

// Título responsivo
const Title = styled.h1`
    font-size: 1.8rem;
    color: #1e3a8a;
    font-weight: 700;
    margin-bottom: 8px;
    font-family: 'Roboto', sans-serif;

    @media (min-width: 768px) {
        font-size: 2.5rem;
        margin-bottom: 10px;
    }
`;

// Subtítulo responsivo
const Subtitle = styled.p`
    font-size: 1rem;
    color: #64748b;
    font-family: 'Roboto', sans-serif;

    @media (min-width: 768px) {
        font-size: 1.1rem;
    }
`;

// Container de busca em coluna para mobile
const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 30px;
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    @media (min-width: 768px) {
        flex-direction: row;
        gap: 15px;
        margin-bottom: 40px;
    }
`;

// Input de busca responsivo
const SearchInput = styled.input`
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    width: 100%;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    transition: border-color 0.3s ease;

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
    }
`;

// Select responsivo
const FilterSelect = styled.select`
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: white;
    width: 100%;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    transition: border-color 0.3s ease;

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
    }

    @media (min-width: 768px) {
        width: auto;
        min-width: 200px;
    }
`;

// Mensagens responsivas
const LoadingMessage = styled.div`
    padding: 40px 20px;
    text-align: center;
    font-size: 1.1rem;
    color: #64748b;
    font-family: 'Roboto', sans-serif;

    @media (min-width: 768px) {
        padding: 60px 20px;
        font-size: 1.2rem;
    }
`;

const ErrorMessage = styled.div`
    padding: 15px;
    background: #fef2f2;
    color: #dc2626;
    border-radius: 8px;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    margin: 0 10px;

    button {
        margin-top: 10px;
        padding: 8px 16px;
        background: #dc2626;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.3s ease;

        &:hover {
            background: #b91c1c;
        }
    }

    @media (min-width: 768px) {
        padding: 20px;
        margin: 0;
    }
`;

const NoProductsMessage = styled.p`
    text-align: center;
    color: #64748b;
    font-family: 'Roboto', sans-serif;
    padding: 15px;
    margin: 0 10px;

    @media (min-width: 768px) {
        padding: 20px;
        margin: 0;
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
            <Header>
                <Title>Produtos Disponíveis</Title>
                <Subtitle>Explore nossa seleção</Subtitle>
            </Header>
            <LoadingMessage>⏳ Carregando produtos...</LoadingMessage>
        </Container>
    );

    if (error) return (
        <Container>
            <Header>
                <Title>Produtos Disponíveis</Title>
                <Subtitle>Explore nossa seleção</Subtitle>
            </Header>
            <ErrorMessage>
                ❌ Erro ao carregar produtos: {error}
                <button onClick={() => window.location.reload()}>Tentar novamente</button>
            </ErrorMessage>
        </Container>
    );

    return (
        <Container>
            <Header>
                <Title>Produtos Disponíveis</Title>
                <Subtitle>Explore nossa seleção</Subtitle>
            </Header>

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
                <NoProductsMessage>Nenhum produto encontrado com os filtros selecionados.</NoProductsMessage>
            ) : (
                <ProductList products={filteredProducts} />
            )}
        </Container>
    );
};

export default Home;