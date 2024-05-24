const userRouter = require('express').Router();
const userController = require('../../controller/user');
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
		res.status(400).json({ error: error.message });
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
		const { name, email, password } = req.body;
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
			},
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

userRouter.post('/login', userController.login);
userRouter.get('/refresh', userController.refresh);

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
