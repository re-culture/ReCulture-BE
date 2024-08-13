const bookmarkRouter = require('express').Router();
const bookmarkController = require('../../controller/bookmark.controller');
const authMiddleware = require('../../utils/auth.middleware');

// Middleware
bookmarkRouter.use(authMiddleware);

/**
 * @swagger
 * /bookmark:
 *   get:
 *     summary: Get users bookmark posts
 *     tags: [bookmark]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get users bookmark posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Bookmark'
 *  */
bookmarkRouter.get('/', bookmarkController.getMyBookmarks);

/**
 * @swagger
 * /bookmark/toggle:
 *   post:
 *     summary: Toggle Bookmark
 *     tags: [bookmark]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              postId:
 *                type: integer
 *                required: true
 *                description: Post Id
 *     responses:
 *       200:
 *         description: Toggle Bookmark Success
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *               added:
 *                 type: boolean
 *               bookmark:
 *                 $ref: '#/components/schemas/Bookmark'
 *  */
bookmarkRouter.post('/toggle', bookmarkController.toggleBookmark);

module.exports = bookmarkRouter;
