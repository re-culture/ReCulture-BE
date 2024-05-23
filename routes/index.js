const router = require('express').Router();
const user = require('./user');

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User management
 */
router.use('/user', user);

module.exports = router;
