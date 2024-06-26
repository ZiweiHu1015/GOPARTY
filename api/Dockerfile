FROM node:18

WORKDIR /api

COPY package.json yarn.lock ./

RUN yarn install

RUN npm install -g nodemon

EXPOSE 8800
