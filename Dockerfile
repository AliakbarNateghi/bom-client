FROM node:20

RUN npm install -g pnpm --legacy-peer-deps

WORKDIR /bom-client

COPY package*.json ./

RUN pnpm install

COPY . .

# RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "dev"]