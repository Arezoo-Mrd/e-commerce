FROM node:18.16.1

WORKDIR /usr/code
COPY package*.json .

RUN npm i
COPY . .
ENV SERVER_PORT 8000
EXPOSE $SERVER_PORT

CMD [ "npm", "run", "start:prod" ]
