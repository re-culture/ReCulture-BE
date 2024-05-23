const userRouter = require('express').Router();
const prisma = require('../../lib/prisma');

/**
 * @swagger
 * /user:
 * get:
 * summary: Get all users
 * tags: [User]
 * responses:
 * 200:
 * description: Get all users
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/User'
 *  default:
 * description: Unexpected error
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 *  */
userRouter.get('/', async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).json(users);
	} catch (error) {
		res.json({ error: error.message });
	}
});

/**
 * @swagger
 * /user:
 * post:
 * summary: Create a user
 * tags: [User]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * responses:
 * 200:
 * description: Create a user
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * default:
 * description: Unexpected error
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Error'
 * */
userRouter.post('/', async (req, res) => {
	try {
		const { name, email } = req.body;
		const user = await prisma.user.create({
			data: {
				name,
				email,
			},
		});
		res.status(200).json(user);
	} catch (error) {
		res.json({ error: error.message });
	}
});

module.exports = userRouter;
