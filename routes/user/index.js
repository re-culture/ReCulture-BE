const userRouter = require('express').Router();
const userController = require('../../controller/user.controller');
const authMiddleware = require('../../utils/auth.middleware');

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Get all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/User'
 *  */
userRouter.get('/', userController.getAllUsers);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Create a user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * */
userRouter.post('/', userController.addUser);

/**
 * @swagger
 * /user/{id}:
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
 * */
userRouter.get('/:id', userController.getUser);

/**
 * @swagger
 * /user/delete:
 *   delete:
 *    summary: Delete a user
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: Delete a user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
userRouter.delete('/delete', authMiddleware, userController.deleteUser);

module.exports = userRouter;
