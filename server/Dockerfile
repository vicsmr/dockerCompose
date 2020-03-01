FROM node:latest

WORKDIR /server

COPY package.json .
RUN npm install --quiet

COPY . .

WORKDIR /server
COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh

CMD [ "./wait-for-it.sh" , "dbMongo:27017" , "--strict" , "--timeout=10000" , "--" , "node", "./src/server.js" ]