const ticketRouter = require('express').Router();
const ticketController = require('../../controller/ticket.controller');
const authMiddleware = require('../../utils/auth.middleware');
const photoUploader = require('../../lib/photo_uploader');

// Middleware
ticketRouter.use(authMiddleware);

/**
 * @swagger
 * /ticket:
 *   get:
 *     summary: Get all tickets
 *     tags: [Ticket]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all public tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Ticket'
 *  */
ticketRouter.get('/', ticketController.getAllPublicTickets);

/**
 * @swagger
 * /ticket/user/{id}:
 *   get:
 *     summary: Get User tickets
 *     tags: [Ticket]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: integer
 *        required: true
 *        description: User Id
 *     responses:
 *       200:
 *         description: Get all Users public tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *  */
ticketRouter.get('/user/:id', ticketController.getUserTicket);

/**
 * @swagger
 * /ticket/category/{id}:
 *   get:
 *     summary: Get all category tickets
 *     tags: [Ticket]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        required: true
 *        description: Category Id
 *     responses:
 *       200:
 *         description: Get all Category public tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *  */
ticketRouter.get('/category/:id', ticketController.getCategoryTicket);

/**
 * @swagger
 * /ticket/my-ticket:
 *   get:
 *     summary: Get my all category tickets
 *     tags: [Ticket]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all Category public tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *  */
ticketRouter.get('/my-ticket', ticketController.getMyTicket);

/**
 * @swagger
 * /ticket/{id}:
 *   get:
 *     summary: Get specific ticket post
 *     tags: [Ticket]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        required: true
 *        description: Ticket Post Id
 *     responses:
 *       200:
 *         description: Get Specific ticket post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *  */
ticketRouter.get('/:id', ticketController.getDetailTicket);

/**
 * @swagger
 * /ticket:
 *   post:
 *     summary: Create a ticket
 *     tags: [Ticket]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       '200':
 *         description: Create a ticket
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                ticket:
 *                 type: object
 *                 $ref: '#/components/schemas/Ticket'
 *                photoDocs:
 *                  type: array
 *                  items:
 *                   type: object
 *                   properties:
 *                     ticketPostId:
 *                      type: integer
 *                     url:
 *                      type: string
 */
ticketRouter.post(
  '/',
  photoUploader.array('photos', 5),
  ticketController.postTicket
);

module.exports = ticketRouter;
