const cultureRouter = require('express').Router();
const cultureController = require('../../controller/culture.controller');

/**
 * @swagger
 * /culture:
 *   get:
 *     summary: Get all cultures
 *     tags: [Culture]
 *     responses:
 *       200:
 *         description: Get all public cultures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Culture'
 *  */
cultureRouter.get('/', cultureController.getAllPublicCultures);

/**
 * @swagger
 * /culture/user/{id}:
 *   get:
 *     summary: Get User cultures
 *     tags: [Culture]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: integer
 *        required: true
 *        description: User Id
 *     responses:
 *       200:
 *         description: Get all Users public cultures
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Culture'
 *  */
cultureRouter.get('/user/:id', cultureController.getUserCulture);

/**
 * @swagger
 * /culture/category/{id}:
 *   get:
 *     summary: Get all category cultures
 *     tags: [Culture]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        required: true
 *        description: Category Id
 *     responses:
 *       200:
 *         description: Get all Category public cultures
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Culture'
 *  */
cultureRouter.get('/category/:id', cultureController.getCategoryCulture);

/**
 * @swagger
 * /culture/{id}:
 *   get:
 *     summary: Get specific culture post
 *     tags: [Culture]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        required: true
 *        description: Culture Post Id
 *     responses:
 *       200:
 *         description: Get Specific culture post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Culture'
 *  */
cultureRouter.get('/:id', cultureController.getDetailCulture);

/**
 * 
 * /culture:
 *   post:
 *     summary: Create a culture
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Create a culture
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               createdAt:
 *                 type: string
 *
cultureRouter.post('/', cultureController.addUser);

/**
 * 
 * /culture/{id}:
 *   get:
 *     summary: Get User By Id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         id: integer
 *         required: true
 *     responses:
 *       '200':
 *         description: Search User By Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * 
cultureRouter.get('/:id', cultureController.getUser);
*/
module.exports = cultureRouter;
