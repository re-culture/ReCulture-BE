const prisma = require('../lib/prisma');
const { DisclosureType } = require('@prisma/client');

exports.getAllPublicCultures = async (req, res) => {
  try {
    const cultures = await prisma.culturePost.findMany({
      where: {
        disclosure: DisclosureType.PUBLIC,
      },
    });
    res.status(200).json(cultures);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserCulture = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cultures = await prisma.culturePost.findMany({
      where: {
        authorId: id,
        disclosure: DisclosureType.PUBLIC,
      },
    });
    res.status(200).json(cultures);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCategoryCulture = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cultures = await prisma.culturePost.findMany({
      where: {
        categoryId: id,
        disclosure: DisclosureType.PUBLIC,
      },
    });
    res.status(200).json(cultures);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDetailCulture = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const culture = await prisma.culturePost.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(culture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.postCulture = async (req, res) => {
  try {
    const {
      title,
      emoji,
      date,
      categoryId,
      disclosure,
      review,
      detail1,
      detail2,
      detail3,
      detail4,
    } = req.body;
    const authorId = req.user.id;
    const culture = await prisma.culturePost.create({
      data: {
        title,
        emoji,
        date,
        categoryId,
        authorId,
        disclosure,
        review,
        detail1,
        detail2,
        detail3,
        detail4,
      },
    });
    res.status(200).json(culture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*
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
};
*/
