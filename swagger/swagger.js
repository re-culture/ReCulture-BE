const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { DisclosureType } = require('@prisma/client');

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
              type: 'DateTime',
              example: '2024-05-24T03:41:10.125Z',
            },
          },
        },
        Culture: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            title: {
              type: 'string',
              example: '아이유 콘서트',
            },
            emoji: {
              type: 'string',
              example: '😻',
            },
            date: {
              type: 'DateTime',
              example: '2024-05-24T03:41:10.125Z',
            },
            categoryId: {
              type: 'integer',
              example: 1,
            },
            authorId: {
              type: 'integer',
              example: 1,
            },
            disclosure: {
              type: 'DisclosureType',
              example: 'PUBLIC',
            },
            review: {
              type: 'string',
              example: '좋아요',
            },
            detail1: {
              type: 'string',
              example: '아이유 콘서트',
            },
            detail2: {
              type: 'string',
              example: '아이유 콘서트',
            },
            detail3: {
              type: 'string',
              example: '아이유 콘서트',
            },
            detail4: {
              type: 'string',
              example: '아이유 콘서트',
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            category_name: {
              type: 'string',
              example: '스포츠 경기',
            },
            detail1_name: {
              type: 'string',
              example: '스포츠 종류',
            },
            detail2_name: {
              type: 'string',
              example: '상대팀 / 경기 장소',
            },
            detail3_name: {
              type: 'string',
              example: '경기 결과',
            },
            detail4_name: {
              type: 'string',
              example: '선발 라인업',
            },
          },
        },
        FollowRequest: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            fromUserId: {
              type: 'integer',
              example: 1,
            },
            toUserId: {
              type: 'integer',
              example: 2,
            },
            status: {
              type: 'FollowRequestStatus',
              example: 'ACCEPTED',
            },
            createdAt: {
              type: 'DateTime',
              example: '2024-05-24T03:41:10.125Z',
            },
            updatedAt: {
              type: 'DateTime',
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
