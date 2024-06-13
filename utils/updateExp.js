const prisma = require('../lib/prisma');
const { LevelName } = require('@prisma/client');

exports.addExp = async (userId, point) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: parseInt(userId) },
    });
    if (!profile) {
      return false;
    }
    const exp = profile.exp + point;
    let levelId = profile.levelId;
    let level = profile.level;
    if (exp > 50) {
      levelId = 2;
      level = LevelName.Sophomore;
    } else if (exp > 150) {
      levelId = 3;
      level = LevelName.Junior;
    } else if (exp > 300) {
      levelId = 4;
      level = LevelName.Senior;
    }
    await prisma.profile.update({
      where: { userId: parseInt(userId) },
      data: { exp, level, levelId },
    });
    return true;
  } catch (error) {
    return false;
  }
};
