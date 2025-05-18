FROM node:18

WORKDIR /app

RUN npm install -g nodemon

COPY package*.json ./

ENV NODE_ENV=development
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]