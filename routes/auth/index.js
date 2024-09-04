const authRouter = require('express').Router();
const authController = require('../../controller/auth.controller');
const authMiddleware = require('../../utils/auth.middleware');

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Register to user
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
 *          description: Register to user
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
authRouter.post('/register', authController.register);

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

/**
 * @swagger
 * /auth/logout:
 *  post:
 *   summary: logout
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
 *      description: logout success
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *            message:
 *              type: string
 * */

authRouter.post('/logout', authController.logout);

/**
 * @swagger
 * /auth/change_password:
 *  put:
 *   summary: Change password
 *   tags: [Auth]
 *   security:
 *     - bearerAuth: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             cur_password:
 *               type: string
 *             new_password:
 *               type: string
 *   responses:
 *     '200':
 *       description: Change password
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 */
authRouter.put('/change_password', authMiddleware, authController.changePassword);

module.exports = authRouter;
