const cultureRouter = require('express').Router();
const cultureController = require('../../controller/culture.controller');
const authMiddleware = require('../../utils/auth.middleware');
const photoUploader = require('../../lib/photo_uploader');

// Middleware
cultureRouter.use(authMiddleware);

/**
 * @swagger
 * /culture:
 *   get:
 *     summary: Get all cultures
 *     tags: [Culture]
 *     parameters:
 *     - in: header
 *       name: authorization
 *       type: string
 *       required: true
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
 *      - in: header
 *        name: authorization
 *        type: string
 *        required: true
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Culture'
 *  */
cultureRouter.get('/user/:id', cultureController.getUserCulture);

/**
 * @swagger
 * /culture/category/{id}:
 *   get:
 *     summary: Get all category cultures
 *     tags: [Culture]
 *     parameters:
 *      - in: header
 *        name: authorization
 *        type: string
 *        required: true
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Culture'
 *  */
cultureRouter.get('/category/:id', cultureController.getCategoryCulture);

/**
 * @swagger
 * /culture/my-culture:
 *   get:
 *     summary: Get my all category cultures
 *     tags: [Culture]
 *     parameters:
 *      - in: header
 *        name: authorization
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: Get all Category public cultures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Culture'
 *  */
cultureRouter.get('/my-culture', cultureController.getMyCulture);

/**
 * @swagger
 * /culture/{id}:
 *   get:
 *     summary: Get specific culture post
 *     tags: [Culture]
 *     parameters:
 *      - in: header
 *        name: authorization
 *        type: string
 *        required: true
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
 * @swagger
 * /culture:
 *   post:
 *     summary: Create a culture
 *     tags: [Culture]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Culture'
 *     responses:
 *       '200':
 *         description: Create a culture
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                culture:
 *                 type: object
 *                 $ref: '#/components/schemas/Culture'
 *                photoDocs:
 *                  type: array
 *                  items:
 *                   type: object
 *                   properties:
 *                     culturePostId:
 *                      type: integer
 *                     url:
 *                      type: string
 */
cultureRouter.post(
  '/',
  photoUploader.array('photos', 5),
  cultureController.postCulture
);

module.exports = cultureRouter;
