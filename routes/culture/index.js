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
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
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
cultureRouter.get('/', cultureController.getAllAccessibleCultures);

/**
 * @swagger
 * /culture/search:
 *   get:
 *     summary: Search cultures
 *     tags: [Culture]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: searchString
 *        schema:
 *          type: string
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *      - in: query
 *        name: pageSize
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: Search cultures with query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Culture'
 *  */
cultureRouter.get('/search', cultureController.searchCultures);

/**
 * @swagger
 * /culture/user/{id}:
 *   get:
 *     summary: Get User cultures
 *     tags: [Culture]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: integer
 *        required: true
 *        description: User Id
 *     responses:
 *       200:
 *         description: Get all Users follower cultures
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
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        required: true
 *        description: Category Id
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *      - in: query
 *        name: pageSize
 *        schema:
 *          type: integer
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
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get my all Category public cultures
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
 * /culture/my-calendar:
 *   get:
 *     summary: Get my category cultures for query month
 *     tags: [Culture]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: year
 *        schema:
 *        type: integer
 *        required: true
 *        description: year
 *      - in: query
 *        name: month
 *        schema:
 *        type: integer
 *        required: true
 *        description: month
 *     responses:
 *       200:
 *         description: Get my category cultures for query month
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Culture'
 *  */
cultureRouter.get('/my-calendar', cultureController.getMyCalendar);

/**
 * @swagger
 * /culture/recommend:
 *   get:
 *     summary: Get my recommend cultures
 *     tags: [Culture]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get my recommended cultures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Culture'
 *  */
cultureRouter.get('/recommend', cultureController.getRecommendCulture);

/**
 * @swagger
 * /culture/{id}:
 *   get:
 *     summary: Get specific culture post
 *     tags: [Culture]
 *     security:
 *      - bearerAuth: []
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
 * @swagger
 * /culture:
 *   post:
 *     summary: Create a culture
 *     tags: [Culture]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               emoji:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               categoryId:
 *                 type: string
 *               disclosure:
 *                 type: string
 *               review:
 *                 type: string
 *               detail1:
 *                 type: string
 *               detail2:
 *                 type: string
 *               detail3:
 *                 type: string
 *               detail4:
 *                 type: string
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
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

/**
 * @swagger
 * /culture/{id}:
 *   put:
 *     summary: Modify culture
 *     tags: [Culture]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Culture Post Id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               emoji:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               categoryId:
 *                 type: string
 *               disclosure:
 *                 type: string
 *               review:
 *                 type: string
 *               detail1:
 *                 type: string
 *               detail2:
 *                 type: string
 *               detail3:
 *                 type: string
 *               detail4:
 *                 type: string
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
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
cultureRouter.put(
  '/:id',
  photoUploader.array('photos', 5),
  cultureController.putCulture
);

/**
 * @swagger
 * /culture/{id}:
 *   delete:
 *     summary: Delete specific culture post
 *     tags: [Culture]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        required: true
 *        description: Culture Post Id
 *     responses:
 *       200:
 *         description: Delete Specific culture post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Culture'
 *  */
cultureRouter.delete('/:id', cultureController.deleteCulture);

module.exports = cultureRouter;
