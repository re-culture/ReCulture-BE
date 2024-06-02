const profileRouter = require('express').Router();
const profileController = require('../../controller/profile.controller');
const authMiddleware = require('../../utils/auth.middleware');
const photoUploader = require('../../lib/profile_uploader');

// Middleware
profileRouter.use(authMiddleware);

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Get specific profile post
 *     tags: [Culture]
 *     parameters:
 *      - in: header
 *        name: authorization
 *        type: string
 *        required: true
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        required: true
 *        description: Culture Post Id
 *     responses:
 *       200:
 *         description: Get Specific profile post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Culture'
 *  */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get all profiles
 *     tags: [Profile]
 *     parameters:
 *     - in: header
 *       name: authorization
 *       type: string
 *       required: true
 *     responses:
 *       200:
 *         description: Get all profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Profile'
 *  */
profileRouter.get('/', profileController.getAllProfile);

profileRouter.post(
  '/',
  photoUploader.single('photo'),
  profileController.createProfile
);

profileRouter.put(
  '/',
  photoUploader.single('photo'),
  profileController.updateProfile
);

/**
 * @swagger
 * /profile/my-profile:
 *   get:
 *     summary: Get User Profile
 *     tags: [Profile]
 *     parameters:
 *      - in: header
 *        name: authorization
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: Get User Profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *  */
profileRouter.get('/my-profile', profileController.getProfile);

/**
 * @swagger
 * /profile/my-profile:
 *   get:
 *     summary: Get User Profile
 *     tags: [Profile]
 *     parameters:
 *      - in: header
 *        name: authorization
 *        type: string
 *        required: true
 *      - in: path
 *        name: userId
 *        schema:
 *          type: integer
 *        required: true
 *        description: User Id
 *     responses:
 *       200:
 *         description: Get User Profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *  */
profileRouter.get('/:id', profileController.getSpeceficProfile);

module.exports = profileRouter;
