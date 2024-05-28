const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Re:Culture API',
      version: '1.0.0',
      description: 'API Docs for Re:Culture',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:8080/api/',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              example: 'john@gmail.com',
            },
            password: {
              type: 'string',
              example: '1111',
            },
            createdAt: {
              type: 'string',
              example: '2024-05-24T03:41:10.125Z',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/**/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
