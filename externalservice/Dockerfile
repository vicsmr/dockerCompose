FROM node:latest

WORKDIR /externalservice

COPY package.json .
RUN npm install --quiet

COPY . .

WORKDIR /externalservice

CMD [ "node", "./src/server.js" ]
EXPOSE 9090