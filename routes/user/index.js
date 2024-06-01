const userRouter = require('express').Router();
const userController = require('../../controller/user.controller');

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
 *               name:
 *                 type: string
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

module.exports = userRouter;
