const express = require('express');
const port = process.env.port || 8080;

const app = express();
const api = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Swagger
const { swaggerUi, specs } = require('./swagger/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => console.log(`Server is running on port ${port}`));
