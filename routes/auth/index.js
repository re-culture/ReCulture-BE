const authRouter = require('express').Router();
const authController = require('../../controller/auth.controller');

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login to user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *        '200':
 *          description: Login to user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  accessToken:
 *                    type: string
 *                  refreshToken:
 *                    type: string
 * */
authRouter.post('/login', authController.login);

/**
 * @swagger
 * /auth/refresh:
 *  get:
 *   summary: Refresh token
 *   tags: [Auth]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *     - in: header
 *       name: refresh
 *       type: string
 *       required: true
 *   responses:
 *    '200':
 *      description: Refresh token
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *            id:
 *              type: integer
 *            accessToken:
 *              type: string
 *            refreshToken:
 *              type: string
 * */

authRouter.get('/refresh', authController.refresh);

module.exports = authRouter;
