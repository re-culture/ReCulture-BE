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
    if (error.code === 'P2002') {
      return res.status(400).json({ error: '이메일 중복 오류' });
    }
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.error(401, '로그인이 필요합니다.', 'Unauthorized');
    }
    const user = await prisma.user.delete({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    res.success(user);
  } catch (error) {
    console.error(error);
    res.error(500, "기록을 삭제하는 중 오류가 발생했습니다.", error.message);
  }
};