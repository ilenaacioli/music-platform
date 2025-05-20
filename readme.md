# Projeto Fullstack Music App (Frontend + Backend + Banco) com Docker

Este projeto contém um backend Node.js com Express, MySQL e Knex para banco, e um frontend React, todos rodando em containers Docker orquestrados via Docker Compose.

---

## Estrutura do projeto

```
/
├── backend/         # Backend Node.js
│   ├── Dockerfile
│   ├── package.json
│   ├── knexfile.mjs
│   ├── .env         # Variáveis para backend (DB_HOST, DB_USER, etc)
│   └── src/
│       ├── migrations/
│       └── seeds/
├── frontend/        # Frontend React
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── docker-compose.yml
└── .env             # Variáveis para Docker Compose (DB configs)
```

---

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

---

## Configuração das variáveis de ambiente

### 1. Crie o arquivo `.env` na raiz do projeto (mesmo nível do `docker-compose.yml`):

```env
DB_HOST=db
DB_USER=root
DB_PASSWORD=root
DB_NAME=musicdb
```

### 2. Crie o arquivo `.env` dentro da pasta `backend/` com o mesmo conteúdo:

```env
DB_HOST=db
DB_USER=root
DB_PASSWORD=root
DB_NAME=musicdb
```

---

## Rodando o projeto

### 1. Construir e subir os containers

```bash
docker-compose up --build
```

### 2. Rodar as migrations (criar tabelas no banco)

```bash
docker-compose exec backend npm run migrate
```

### 3. Rodar os seeds (inserir dados mock)

```bash
docker-compose exec backend npm run seed
```

---

## Como acessar a aplicação

- Backend API estará disponível em: `http://localhost:5000`
- Frontend React estará disponível em: `http://localhost:3000`

---

## Comandos úteis

### Logs

- Backend logs:

```bash
docker-compose logs -f backend
```

- Frontend logs:

```bash
docker-compose logs -f frontend
```

### Acessar container backend

```bash
docker-compose exec backend sh
```

### Parar containers

```bash
docker-compose down -v
```

---

## Observações

- O banco MySQL fica exposto na porta `3306`, com senha `root` e database `musicdb`.
- O backend se conecta ao banco via hostname `db` (nome do serviço no docker-compose).
- As migrations e seeds usam `knexfile.mjs` que lê as variáveis via `dotenv`.
- Os volumes Docker garantem persistência dos dados do MySQL (`mysql_data`).

---

## Possíveis melhorias futuras

- Automatizar a execução de migrations/seeds na inicialização do backend
- Configurar HTTPS no frontend/backend
- Adicionar testes automatizados para backend e frontend
- Configurar um proxy reverso (NGINX) para unificar frontend/backend em uma só porta

---

Se precisar de ajuda para qualquer passo, só avisar! 🚀
