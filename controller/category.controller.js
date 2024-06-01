const prisma = require('../lib/prisma');

exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.categoryDetail.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const category = await prisma.categoryDetail.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
