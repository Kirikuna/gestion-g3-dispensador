FROM node:16-alpine

WORKDIR /app

ARG FIREBASE

ENV FIREBASE=$FIREBASE

COPY package*.json ./
RUN npm install
RUN curl $FIREBASE -o reporte-dispensadores-firebase-adminsdk-osq0a-95b3a59ea1.json

COPY . .

CMD ["npm", "run", "dev"]