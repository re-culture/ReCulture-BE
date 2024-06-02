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
 *     parameters:
 *     - in: header
 *       name: authorization
 *       type: string
 *       required: true
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
 *     parameters:
 *      - in: header
 *        name: authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: Follow Request
 *        type: object
 *        required: true
 *        properties:
 *          receiverId:
 *            type: integer
 *            required: true
 *            description: Receiver User Id
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
 *     parameters:
 *      - in: header
 *        name: authorization
 *        type: string
 *        required: true
 *      - in: path
 *        name: requestId
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
 *     parameters:
 *      - in: header
 *        name: authorization
 *        type: string
 *        required: true
 *      - in: path
 *        name: requestId
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

followRouter.get('/followers', followController.getMyFollowers);

followRouter.get('/followings', followController.getMyFollwings);

module.exports = followRouter;
