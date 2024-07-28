# Descrição

Aplicação para controle e análise de usuários registrados desenvolvido com React, Nest, e MySQL.

## Passo a Passo para Rodar a Aplicação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/username/repo-backend.git
   cd repo-backend

## Back-end

1. **Entre na pasta do back-end**

    ```bash
    cd back-end-eap
    cd user-management-api

2. **Conectar ao banco de dados**

    Crie dentro da pasta 'user-management-api' um arquivo '.env' com a estrutura do seu banco de dados neste formato:

    ```bash
    DATABASE_HOST=host do seu banco de dados
    DATABASE_PORT=porta que seu banco de dados está rodando
    DATABASE_USERNAME=usuário do seu banco de dados
    DATABASE_PASSWORD=senha do seu banco de dados
    DATABASE_NAME=nome do seu banco de dados

3. **Instale as dependências**

    ```bash
    pnpm install

4. **Rode a Aplicação**

   ```bash
    $ pnpm run start
    ```

## Front-end

1. **Entre na pasta do back-end**

    ```bash
    cd front-end-eap
    cd user-management-frontend

2. **Instale as dependências**

    ```bash
    npm install

3. **Rode a Aplicação**

   ```bash
    $ npm start
