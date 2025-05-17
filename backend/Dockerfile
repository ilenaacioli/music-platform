FROM node:18

WORKDIR /app

# Instala nodemon globalmente para garantir que esteja disponível
RUN npm install -g nodemon

COPY package*.json ./

# Garante que todas as dependências sejam instaladas
ENV NODE_ENV=development
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]