const express = require('express');
const port = process.env.port || 8080;

const app = express();
const path = require('path');
const api = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', api);

// Swagger
const { swaggerUi, specs } = require('./swagger/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => `Server is running on port ${port}`);
