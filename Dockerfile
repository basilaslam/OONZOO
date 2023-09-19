FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn


COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
