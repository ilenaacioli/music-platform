FROM node:18

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=development

RUN npm install

RUN npm install -D \
  @vitejs/plugin-react \
  jest \
  jest-environment-jsdom \
  @testing-library/react \
  @testing-library/jest-dom \
  babel-jest \
  @babel/preset-env \
  @babel/preset-react \
  identity-obj-proxy

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
