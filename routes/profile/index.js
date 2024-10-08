const profileRouter = require('express').Router();
const profileController = require('../../controller/profile.controller');
const authMiddleware = require('../../utils/auth.middleware');
const photoUploader = require('../../lib/profile_uploader');

// Middleware
profileRouter.use(authMiddleware);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get all profiles
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
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

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Create User profile
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *         schema:
 *           type: object
 *           properties:
 *            nickname:
 *             type: string
 *            bio:
 *             type: string
 *            birthdate:
 *             type: string
 *             format: date-time
 *            interest:
 *             type: string
 *            photo:
 *             type: string
 *             format: binary
 *     responses:
 *       200:
 *         description: Create User Profile
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Profile'
 *  */
profileRouter.post(
  '/',
  photoUploader.single('photo'),
  profileController.createProfile
);

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Modify User Profile
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *         schema:
 *           type: object
 *           properties:
 *            nickname:
 *             type: string
 *            bio:
 *             type: string
 *            birthdate:
 *             type: string
 *             format: date-time
 *            interest:
 *             type: string
 *            photo:
 *             type: string
 *             format: binary
 *     responses:
 *       200:
 *         description: Modify User Profile
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Profile'
 *  */
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
 *     security:
 *      - bearerAuth: []
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
 * /profile/add-cul-exp:
 *   put:
 *     summary: Add Culture Exp Point
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Add Culture Exp Point
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *  */
profileRouter.put('/add-cul-exp', profileController.addCultureExp);

/**
 * @swagger
 * /profile/add-tick-exp:
 *   put:
 *     summary: Add Ticket Exp Point
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Add Ticket Exp Point
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *  */
profileRouter.put('/add-tick-exp', profileController.addTicketExp);


/**
 * @swagger
 * /profile/search:
 *  get:
 *   summary: Search User Profile
 *   tags: [Profile]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *     - in: query
 *       name: nickname
 *       schema:
 *         type: string
 *         required: false
 *         description: User Nickname
 *     - in: query
 *       name: page
 *       schema:
 *         type: integer
 *         required: false
 *     - in: query
 *       name: pageSize
 *       schema:
 *         type: integer
 *         required: false
 *   responses:
 *     200:
 *      description: Search User Profile
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Profile'
 * */
profileRouter.get('/search', profileController.searchProfile);

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Get specific profile
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        required: true
 *        description: User Id
 *     responses:
 *       200:
 *         description: Get Specific profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Culture'
 *  */
profileRouter.get('/:id', profileController.getSpeceficProfile);

module.exports = profileRouter;
