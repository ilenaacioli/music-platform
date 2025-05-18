FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install \
  && npm install -D @vitejs/plugin-react

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]