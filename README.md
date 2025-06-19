E-commerce Devnology - Documentação
📦 Visão Geral

Este projeto é uma solução completa de e-commerce que integra produtos de múltiplos fornecedores, com carrinho de compras e sistema de pedidos.
🛠 Tecnologias Utilizadas

    Frontend: React + TypeScript

    Backend: NestJS

    Estilização: styled-components

    Gerenciamento de Estado: Context API

🚀 Como Executar o Projeto
Pré-requisitos

    Node.js 20+

    npm ou yarn (de preferencia o npm)

    Git

🔧 Instalação

    Clone o repositório:
    bash

git clone https://github.com/pedrosogit/Ecommerce.git
cd ecommerce-devnology

Instale as dependências:
bash

    # Backend
    cd ../backend
    npm install

    
    # Frontend
    cd frontend
    npm install

⚙️ Configuração

    Backend:
        Inicie o servidor:
        bash

    npm run start

    Acesse: http://localhost:3000

Frontend:

    Verifique a API URL em src/api/config.ts

    Inicie a aplicação:
    bash

        npm start

        Acesse: http://localhost:3001

🛒 Funcionalidades Implementadas
Carrinho de Compras

    Adicionar/remover produtos

    Ajustar quantidades

    Cálculo automático de totais

    Persistência no localStorage

    Limpeza do carrinho

Componentes Principais

    ProductList: Listagem de produtos com busca/filtro

    ProductCard: Card de produto individual

    Checkout: Página de finalização de compra

    CartContext: Gerenciamento global do carrinho


