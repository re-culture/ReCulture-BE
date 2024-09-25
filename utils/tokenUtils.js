const prisma = require('../lib/prisma');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.ACCESS_TOKEN_SECRET;

// Generate access token
exports.generateAccessToken = (userId) => {
  return jwt.sign({ userId }, JWT_KEY, { expiresIn: '7d' });
};

// Generate refresh token
exports.generateRefreshToken = () => {
  return jwt.sign({}, JWT_KEY, { algorithm: 'HS256', expiresIn: '7d' });
};

// Verify refresh token
exports.verifyRefreshToken = async (token, userId) => {
  try {
    const result = await prisma.token.findUnique({
      where: {
        userId,
        token,
      },
    });
    if (result.token === token) {
      try {
        jwt.verify(token, JWT_KEY);
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// Verify access token
exports.verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    return { ok: true, id: decoded.id };
  } catch (error) {
    return { ok: false, message: error.message };
  }
};
