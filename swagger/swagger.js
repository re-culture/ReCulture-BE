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
	},
	apis: ['./routes/**/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
