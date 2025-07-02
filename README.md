Pizzaria IA

Projeto full stack de um boot de atendimento para pizzaria, utilizando Inteligência Artificial.

Funcionalidades

- API REST (POST, GET, DELETE) para gerenciar mensagens
- Bot de atendimento inteligente com foco no cardápio de pizzas
- Respostas persuasivas seguindo regras de venda
- Frontend React integrado com WebSocket
- Botão para limpar histórico de mensagens
- Conexão com banco de dados MySQL para persistência de dados

---

Tecnologias

-Backend: Node.js, TypeScript, Express, TypeORM, MySQL, Gemini, Socket.io
-Frontend: React, Vite, Axios, Socket.io-client
-Extras: Testes unitários (Jest)

---

Como rodar o projeto

```

Backend

# Entrar na pasta backend
cd pizzaria-bot-backend

# Instalar dependências
npm install

# Criar arquivo .env com sua GEMINI_API_KEY e configs do MySQL
# Exemplo:
# GEMINI_API_KEY=your_api_key
# DB_HOST=localhost
# DB_PORT=3306
# DB_USERNAME=root
# DB_PASSWORD=your_password
# DB_DATABASE=pizzaria

# Iniciar servidor em dev
npm run dev

# Em outro terminal, entrar na pasta do frontend
cd pizzaria-bot-frontend

# Instalar dependências
npm install

# Iniciar aplicação
npm run dev

