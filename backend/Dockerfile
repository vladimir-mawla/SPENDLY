FROM node:16

ARG ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install

COPY . .

ENV NODE_ENV $ENV

EXPOSE 5000

CMD [ "npm", "run", "start" ]