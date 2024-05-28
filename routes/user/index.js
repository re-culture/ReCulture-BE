const userRouter = require('express').Router();
const userController = require('../../controller/user');
const prisma = require('../../lib/prisma');
const bcrypt = require('bcrypt');

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
 *                 type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *  */
userRouter.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

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
userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const encodedPW = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: encodedPW,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /user/login:
 *  post:
 *    summary: Login to user
 *    tags: [User]
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
userRouter.post('/login', userController.login);

/**
 * @swagger
 * /user/refresh:
 *  get:
 *   summary: Refresh token
 *   tags: [User]
 *   parameters:
 *     - in: header
 *       name: Authorization
 *       type: string
 *       required: true
 *     - in: header
 *       name: Refresh
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

userRouter.get('/refresh', userController.refresh);

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
userRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = userRouter;
