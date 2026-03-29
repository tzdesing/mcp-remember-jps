FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# cria pasta de dados
RUN mkdir -p /data

CMD ["node", "index.js"]
