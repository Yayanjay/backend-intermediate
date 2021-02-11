FROM node:latest

RUN mkdir -p /usr/cafeapp

WORKDIR /usr/cafeapp

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]