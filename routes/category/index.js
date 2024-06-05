const categoryRouter = require('express').Router();
const categoryController = require('../../controller/category.controller');
const authMiddleware = require('../../utils/auth.middleware');

// Middleware
categoryRouter.use(authMiddleware);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all Categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Category'
 *  */
categoryRouter.get('/', categoryController.getCategories);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get User categorys
 *     tags: [Category]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: integer
 *        required: true
 *        description: Category Id
 *     responses:
 *       200:
 *         description: Get Category Info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *  */
categoryRouter.get('/:id', categoryController.getCategory);

module.exports = categoryRouter;
