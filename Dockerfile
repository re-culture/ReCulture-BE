FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && \
    ls -la node_modules/swagger-ui-express && \
    ls -la node_modules

COPY . .

FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

RUN ls -la node_modules/swagger-ui-express && \
    ls -la node_modules

RUN npm install

RUN npm run prisma:generate

EXPOSE 8080

CMD [ "npm", "run", "start" ]