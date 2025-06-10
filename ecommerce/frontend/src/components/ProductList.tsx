import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then(res => setProducts(res.data))
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Pesquisar produtos..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border p-2 mb-4 w-full"
            />
            <div className="grid grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                    <div key={`${product.provider}-${product.id}`} className="border p-4">
                        <h2 className="text-xl">{product.name}</h2>
                        <p>R$ {product.price}</p>
                        <p>Fornecedor: {product.provider}</p>
                        <button
                            onClick={() =>
                                addToCart({
                                    productId: `${product.provider}-${product.id}`,
                                    name: product.name,
                                    price: product.price,
                                    quantity: 1,
                                })
                            }
                            className="bg-blue-500 text-white p-2 mt-2"
                        >
                            Adicionar ao Carrinho
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;