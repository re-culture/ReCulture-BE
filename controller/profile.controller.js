const prisma = require('../lib/prisma');

exports.createProfile = async (req, res) => {
  const profilePhoto = req.file
    ? `/uploads/profile/${req.file.filename}`
    : '/uploads/profile/default.jpg';
  const userId = req.user.id;
  const { nickname, bio, birthdate, interest } = req.body;
  try {
    const profile = await prisma.profile.create({
      data: {
        userId: parseInt(userId),
        nickname,
        bio,
        birthdate: birthdate ? new Date(birthdate) : null,
        interest,
        profilePhoto,
      },
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const profilePhoto = req.file
    ? `/uploads/profile/${req.file.filename}`
    : '/uploads/profile/default.jpg';
  const { nickname, bio, birthdate, interests } = req.body;
  try {
    const profile = await prisma.profile.update({
      where: { userId: parseInt(userId) },
      data: {
        nickname,
        bio,
        birthdate: birthdate ? new Date(birthdate) : null,
        interests,
        profilePhoto,
      },
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: parseInt(userId) },
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProfile = async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSpeceficProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: parseInt(userId) },
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
