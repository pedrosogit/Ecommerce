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

    npm ou yarn

    Git

🔧 Instalação

    Clone o repositório:
    bash

git clone https://github.com/pedrosogit/Ecommerce
cd ecommerce-devnology

Instale as dependências:
bash

    # Frontend
    cd frontend
    npm install

    # Backend
    cd ../backend
    npm install

⚙️ Configuração

    Backend:

        Configure as variáveis de ambiente no .env (se necessário)

        Inicie o servidor:
        bash

    npm run start:dev

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

📂 Estrutura de Arquivos
text

frontend/
├── src/
│   ├── components/
│   │   ├── ProductCard/
│   │   ├── ProductList/
│   │   └── Header/
│   ├── pages/
│   │   ├── Home/
│   │   └── Checkout/
│   ├── context/
│   │   └── CartContext.js
│   ├── api/
│   └── types/
backend/
├── src/
│   ├── products/
│   ├── orders/
│   └── main.ts

💡 Como Contribuir

    Faça um fork do projeto

    Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

    Commit suas mudanças (git commit -m 'Add some AmazingFeature')

    Push para a branch (git push origin feature/AmazingFeature)

    Abra um Pull Request

📝 Licença

Distribuído sob a licença MIT. Veja LICENSE para mais informações.
✉️ Contato

Seu Nome - seu-email@exemplo.com
