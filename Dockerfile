FROM node:14.15.1-alpine3.10

RUN mkdir -p usr/src/app

WORKDIR /usr/src/app

COPY . .

EXPOSE 8090

RUN npm install

CMD npm run start
