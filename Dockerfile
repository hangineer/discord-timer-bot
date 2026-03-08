FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY app/index.js ./

CMD [ "node", "index.js" ]