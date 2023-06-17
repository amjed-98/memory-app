FROM node:16-slim

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . ./

CMD [ "pnpm", "start" ]
