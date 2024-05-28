const router = require('express').Router();
const user = require('./user');

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User management
 */
router.use('/user', user);

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test Hello World For Server
 *     tags: [default]
 *     responses:
 *       200:
 *         description: Test Hello World
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Hello World
 *  */
router.get('/test', (req, res) => {
  res.send('Hello World');
});

module.exports = router;
