const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    if (!user) {
      throw new Error();
    }
    console.log(user);
    req.user = user;
    console.log(req);
    next();
  } catch (error) {
    res.status(401).json({ error: '로그인 오류' });
  }
};

module.exports = authMiddleware;
