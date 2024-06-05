const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const { exclude } = require('../utils/excludeField');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    const filteredUsers = users.map((user) => exclude(user, ['password']));
    res.status(200).json(filteredUsers);
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
    const filteredUser = exclude(user, ['password']);
    res.status(200).json(filteredUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encodedPW = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: encodedPW,
      },
    });
    const filteredUser = exclude(user, ['password']);
    res.status(200).json(filteredUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
