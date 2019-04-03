FROM node:8.10.0 AS base

ENV APP_HOME /app
WORKDIR ${APP_HOME}

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]

