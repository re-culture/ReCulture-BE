const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
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
};

exports.addUser = async (req, res) => {
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
};
