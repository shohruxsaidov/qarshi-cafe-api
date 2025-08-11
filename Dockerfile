FROM node:20-alpine

WORKDIR /app
RUN npm i pnpm -g

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["npm", "start"]