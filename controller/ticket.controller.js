const prisma = require('../lib/prisma');
const { DisclosureType } = require('@prisma/client');
const { addExp } = require('../utils/updateExp');

exports.getAllPublicTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticketPost.findMany({
      where: {
        disclosure: DisclosureType.PUBLIC,
      },
      include: {
        photos: true,
      },
    });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAccessibleTickets = async (req, res) => {
  try {
    const userId = req.user.id;

    const tickets = await prisma.ticketPost.findMany({
      where: {
        OR: [
          {
            disclosure: DisclosureType.PUBLIC,
          },
          {
            AND: [
              {
                disclosure: DisclosureType.FOLLOWER,
              },
              {
                author: {
                  followers: {
                    some: {
                      followingId: userId,
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      include: { photos: true },
    });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchTickets = async (req, res) => {
  try {
    const searchString = req.query.searchString || '';
    const tickets = await prisma.ticketPost.findMany({
      where: {
        disclosure: DisclosureType.PUBLIC,
        OR: [
          {
            title: {
              contains: searchString,
            },
          },
          {
            review: {
              contains: searchString,
            },
          },
        ],
      },
      include: { photos: true },
    });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserTicket = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tickets = await prisma.ticketPost.findMany({
      where: {
        authorId: id,
        disclosure: DisclosureType.FOLLOWER,
      },
      include: {
        photos: true,
      },
    });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCategoryTicket = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tickets = await prisma.ticketPost.findMany({
      where: {
        categoryId: id,
        disclosure: DisclosureType.PUBLIC,
      },
      include: {
        photos: true,
      },
    });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDetailTicket = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const ticket = await prisma.ticketPost.findUnique({
      where: {
        id,
      },
      include: {
        photos: true,
      },
    });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMyTicket = async (req, res) => {
  try {
    const authorId = req.user.id;
    const tickets = await prisma.ticketPost.findMany({
      where: {
        authorId,
      },
      include: {
        photos: true,
      },
    });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.postTicket = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ error: 'Please upload a file' });
  }
  try {
    const { title, emoji, date, categoryId, disclosure, review, frameId } = req.body;
    const authorId = req.user.id;
    const ticket = await prisma.ticketPost.create({
      data: {
        title,
        emoji,
        date,
        categoryId: parseInt(categoryId),
        authorId,
        disclosure,
        review,
        frameId: parseInt(frameId),
      },
    });
    const photoDocs = req.files.map((file) => ({
      ticketPostId: ticket.id,
      url: `/uploads/${req.user.id}/${file.filename}`,
    }));

    await prisma.ticketPhoto.createMany({
      data: photoDocs,
    });

    await addExp(authorId, 5);

    res.status(200).json({ ticket, photoDocs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
