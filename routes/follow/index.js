const followRouter = require('express').Router();
const followController = require('../../controller/follow.controller');
const authMiddleware = require('../../utils/auth.middleware');

// Middleware
followRouter.use(authMiddleware);

/**
 * @swagger
 * /follow:
 *   get:
 *     summary: Get all users follow request
 *     tags: [Follow]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all users follow request
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/FollowRequest'
 *  */
followRouter.get('/', followController.getMyFollowRequest);

/**
 * @swagger
 * /follow/request:
 *   post:
 *     summary: Create Follow Request
 *     tags: [Follow]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              receiverId:
 *                type: integer
 *                required: true
 *                description: Receiver User Id
 *     responses:
 *       200:
 *         description: Get all Users public follows
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FollowRequest'
 *  */
followRouter.post('/request', followController.sendFollowRequest);

/**
 * @swagger
 * /follow/accept/{id}:
 *   post:
 *     summary: Accept Follow Request
 *     tags: [Follow]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        required: true
 *        description: Follow Request Id
 *     responses:
 *       200:
 *         description: Accept follow request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FollowRequest'
 *  */
followRouter.post('/accept/:id', followController.acceptFollowRequest);

/**
 * @swagger
 * /follow/reject/{id}:
 *   post:
 *     summary: Reject Follow Request
 *     tags: [Follow]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        required: true
 *        description: Follow Request Id
 *     responses:
 *       200:
 *         description: Reject follow request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FollowRequest'
 *  */
followRouter.post('/reject/:id', followController.rejectFollowRequest);

/**
 * @swagger
 * /follow/followers:
 *   get:
 *     summary: Get all users followers
 *     tags: [Follow]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all users followers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Follower'
 *  */
followRouter.get('/followers', followController.getMyFollowers);

/**
 * @swagger
 * /follow/followings:
 *   get:
 *     summary: Get all users followers
 *     tags: [Follow]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all users followings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Following'
 *  */
followRouter.get('/followings', followController.getMyFollwings);

module.exports = followRouter;
