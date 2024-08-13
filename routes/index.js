const router = require('express').Router();
const user = require('./user');
const auth = require('./auth');
const culture = require('./culture');
const category = require('./category');
const follow = require('./follow');
const profile = require('./profile');
const ticket = require('./ticket');
const bookmark = require('./bookmark');

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User management
 */
router.use('/user', user);

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth management
 */
router.use('/auth', auth);

/**
 * @swagger
 * tags:
 *  name: Culture
 *  description: GET/POST Culture Post
 */
router.use('/culture', culture);

/**
 * @swagger
 * tags:
 *  name: Category
 *  description: GET Category Info
 */
router.use('/category', category);

/**
 * @swagger
 * tags:
 *  name: Follow
 *  description: Follow Request
 */
router.use('/follow', follow);

/**
 * @swagger
 * tags:
 *  name: Profile
 *  description: Profile Management
 */
router.use('/profile', profile);

/**
 * @swagger
 * tags:
 *  name: Ticket
 *  description: Ticket Management
 */
router.use('/ticket', ticket);

/**
 * @swagger
 * tags:
 *   name: Bookmark
 *   description: Bookmark Management
 */
router.use('/bookmark', bookmark);

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
  res.success('Hello World');
});

module.exports = router;
