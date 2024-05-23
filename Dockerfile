FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run prisma:generate

EXPOSE 8080

CMD [ "npm", "run", "start" ]