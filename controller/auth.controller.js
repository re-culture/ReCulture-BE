const prisma = require('../lib/prisma');
const TokenUtils = require('../utils/tokenUtils');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { exclude } = require('../utils/excludeField');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encodedPW = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: encodedPW,
      },
    });

    // Generate token
    const accessToken = TokenUtils.generateAccessToken(user.id);
    const refreshToken = TokenUtils.generateRefreshToken();

    try {
      // Save refresh token
      await prisma.Token.create({
        data: {
          token: refreshToken,
          userId: user.id,
        },
      });
      return res.status(200).json({ id: user.id, accessToken, refreshToken });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: '이메일 중복 오류' });
    }
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        error: 'User not found(Check your email)',
      });
    }

    // Check if password is correct
    if (bcrypt.compareSync(password, user.password) === false) {
      return res.status(401).json({
        error: 'Invalid password',
      });
    }

    // Generate token
    const accessToken = TokenUtils.generateAccessToken(user.id);
    const refreshToken = TokenUtils.generateRefreshToken();

    try {
      // Save refresh token
      await prisma.Token.create({
        data: {
          token: refreshToken,
          userId: user.id,
        },
      });
      return res.status(200).json({ id: user.id, accessToken, refreshToken });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.refresh = async (req, res) => {
  if (req.headers['authorization'] && req.headers['refresh']) {
    const accessToken = req.headers['authorization'].split(' ')[1];
    const refreshToken = req.headers['refresh'];

    const authResult = TokenUtils.verifyAccessToken(accessToken);
    const decoded = jwt.decode(accessToken);

    if (!decoded) {
      res.status(401).json({ error: 'No Authorized!' });
    }

    if (authResult.ok === false && authResult.message === 'jwt expired') {
      try {
        // Refresh token
        const refreshResult = await TokenUtils.verifyRefreshToken(
          refreshToken,
          decoded.userId
        );
        if (refreshResult === false) {
          return res
            .status(401)
            .json({ error: 'No Authorized! (Login Again)' });
        }
        const newAccessToken = TokenUtils.generateAccessToken(decoded.userId);
        res.status(200).json({ accessToken: newAccessToken, refreshToken });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(200).json({ accessToken, refreshToken });
    }
  } else {
    res.status(401).json({ error: 'No Authorized! (No Token)' });
  }
};

exports.logout = async (req, res) => {
  if (req.headers['refresh']) {
    try {
      await prisma.token.delete({
        where: {
          token: req.headers['refresh'],
        },
      });
      res.status(200).json({ message: 'Logout Success!' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(401).json({ error: 'No Authorized! (No Token)' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { cur_password, new_password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (bcrypt.compareSync(cur_password, user.password) === false) {
      return res.error(401, '비밀번호가 일치하지 않습니다.', 'Invalid password');
    }

    const encodedPW = bcrypt.hashSync(new_password, 10);
    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: encodedPW,
      },
    });
    const filteredUser = exclude(updatedUser, ['password']);

    res.success(filteredUser);
  } catch (error) {
    res.error(500, "비밀번호 변경 중 오류가 발생했습니다.", error.message);
  }
}