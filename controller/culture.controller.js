const prisma = require('../lib/prisma');
const { DisclosureType } = require('@prisma/client');
const { addExp } = require('../utils/updateExp');

exports.getAllPublicCultures = async (req, res) => {
  try {
    const cultures = await prisma.culturePost.findMany({
      where: {
        disclosure: DisclosureType.PUBLIC,
      },
      include: { photos: true },
    });
    res.status(200).json(cultures);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchCultures = async (req, res) => {
  try {
    const searchString = req.query.searchString || '';

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const skip = (page - 1) * pageSize;
    const take = pageSize;
    
    const userId = req.user.id;
    const [cultures, totalCultures] = await Promise.all([prisma.culturePost.findMany({
      where: {
        AND: [
          {
            NOT: {
              authorId: userId,
            },
          },
          {
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
                      following: {
                        some: {
                          followerId: userId,
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
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
        ],
      },
      include: { photos: true },
      skip: skip,
      take: take,
      orderBy: {
        createdAt: 'desc',
      },
    }), prisma.culturePost.count({
      where: {
        AND: [
          {
            NOT: {
              authorId: userId,
            },
          },
          {
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
                      following: {
                        some: {
                          followerId: userId,
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
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
        ],
      },
    })]);
    
    const totalPages = Math.ceil(totalCultures / pageSize);

    res.status(200).json({
      data: cultures,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalCultures: totalCultures,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAccessibleCultures = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // 페이지와 페이지 크기 파라미터 (기본값 설정)
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [cultures, totalCultures] = await Promise.all([
      prisma.culturePost.findMany({
        where: {
          AND: [
            {
              NOT: {
                authorId: userId,
              }
            },
            {
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
                        following: {
                          some: {
                            followerId: userId,
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        include: { photos: true },
        skip: skip,
        take: take,
        orderBy: {
          createdAt: 'desc', // 최신순 정렬
        },
      }),
      prisma.culturePost.count({
        where: {
          AND: [
            {
              NOT: {
                authorId: userId,
              }
            },
            {
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
                        following: {
                          some: {
                            followerId: userId,
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      })
    ]);

    const totalPages = Math.ceil(totalCultures / pageSize);

    res.status(200).json({
      data: cultures,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalCultures: totalCultures,
      },
    });
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
        disclosure: DisclosureType.FOLLOWER,
      },
      include: { photos: true },
    });
    res.status(200).json(cultures);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCategoryCulture = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = parseInt(req.params.id);

    // 페이지와 페이지 크기 파라미터 (기본값 설정)
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [cultures, totalCultures] = await Promise.all([
      prisma.culturePost.findMany({
        where: {
          AND: [
            {
              categoryId: id,
            },
            {
              NOT: {
                authorId: userId,
              }
            },
            {
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
                        following: {
                          some: {
                            followerId: userId,
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        include: { photos: true },
        skip: skip,
        take: take,
        orderBy: {
          createdAt: 'desc', // 최신순 정렬
        },
      }),
      prisma.culturePost.count({
        where: {
          AND: [
            {
              categoryId: id,
            },
            {
              NOT: {
                authorId: userId,
              }
            },
            {
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
                        following: {
                          some: {
                            followerId: userId,
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      })
    ]);

    const totalPages = Math.ceil(totalCultures / pageSize);

    res.status(200).json({
      data: cultures,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalCultures: totalCultures,
      },
    });
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
      include: { photos: true, Bookmark: true },
    });

    culture.isBookmarked = culture.Bookmark.some(
      (bookmark) => bookmark.userId === req.user.id
    );
    
    res.status(200).json(culture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMyCulture = async (req, res) => {
  try {
    const authorId = req.user.id;
    const cultures = await prisma.culturePost.findMany({
      where: {
        authorId,
      },
      include: { photos: true },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json(cultures);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMyCalendar = async (req, res) => {
  try {
    const authorId = req.user.id;
    const { year, month } = req.query;
    if (!year || !month) {
      return res.status(400).json({ error: 'Invalid query' });
    }
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    const cultures = await prisma.culturePost.findMany({
      where: {
        authorId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: { photos: true },
    });
    res.status(200).json(cultures);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRecommendCulture = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const ret = await fetch(`${process.env.AI_API_URL}/recommend?user_id=${userId}`);
    const data = await ret.json();

    // 필터링 조건
    const filteredCultures = data.filter(culture => {
      if (culture.authorId === userId) {
        return false;
      }
      // 공개된 문화 게시물 또는 팔로워 전용 게시물
      if (culture.disclosure === 'PUBLIC') {
        return true; // PUBLIC은 누구나 볼 수 있음
      } else if (culture.disclosure === 'FOLLOWER') {
        // 팔로워 전용 게시물은 해당 사용자가 팔로워인지 확인
        return culture.author.following.some(follower => follower.followerId === userId);
      }
      return false;
    }).map(culture => culture.id);

    const skip = (page - 1) * pageSize;
    const pageIds = filteredCultures.slice(skip, skip + pageSize);

    let cultures = await prisma.culturePost.findMany({
      where: {
        id: {
          in: pageIds,
        },
      },
      include: { photos: true },
    });

    cultures = pageIds.map(id => cultures.find(culture => culture.id === id));

    const totalCultures = filteredCultures.length;
    const totalPages = Math.ceil(totalCultures / pageSize);

    res.status(200).json({
      data: cultures,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalCultures: totalCultures,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postCulture = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ error: 'Please upload a file' });
  }
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
        categoryId: parseInt(categoryId),
        authorId,
        disclosure,
        review,
        detail1,
        detail2,
        detail3,
        detail4,
      },
    });

    const photoDocs = req.files.map((file) => ({
      culturePostId: culture.id,
      url: `/uploads/${req.user.id}/${file.filename}`,
    }));

    await prisma.photo.createMany({
      data: photoDocs,
    });

    await addExp(authorId, 10);

    fetch(`${process.env.AI_API_URL}/update-cache?user_id=${authorId}`, {
      method: 'POST',
    });
    res.status(200).json({ culture, photoDocs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.putCulture = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.error(400, '파일을 업로드해주세요.', 'Please upload a file');
  }
  try {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
      return res.error(400, "유효하지 않은 기록 id입니다.", "Invalid id");
    }

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

    const parsedCategoryId = parseInt(categoryId);
    if (!parsedCategoryId || isNaN(parsedCategoryId)) {
      return res.error(400, "유효하지 않은 카테고리 id입니다.", "Invalid categoryId");
    }
    
    const authorId = req.user.id;
    if (!authorId) {
      return res.error(401, "로그인이 필요합니다.", "Unauthorized");
    }

    const result = await prisma.$transaction(async (prisma) => {
      const culture = await prisma.culturePost.update({
        where: { id },
        data: {
          title,
          emoji,
          date,
          categoryId: parsedCategoryId,
          authorId,
          disclosure,
          review,
          detail1,
          detail2,
          detail3,
          detail4,
        },
      });
  
      await prisma.photo.deleteMany({
        where: {
          culturePostId: id,
        },
      });
  
      const photoDocs = req.files.map((file) => ({
        culturePostId: culture.id,
        url: `/uploads/${req.user.id}/${file.filename}`,
      }));
  
      await prisma.photo.createMany({
        data: photoDocs,
      });
      return { culture, photoDocs };
    });
    
    fetch(`${process.env.AI_API_URL}/update-cache?user_id=${authorId}`, {
      method: 'POST',
    });
    res.success(result);
  } catch (error) {
    console.error(error);
    res.error(500, "기록을 수정하는 중 오류가 발생했습니다.", error.message);
  }
};

exports.deleteCulture = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
      return res.error(400, '유효하지 않은 기록 id입니다.', 'Invalid id');
    }
    const authorId = req.user.id;
    if (!authorId) {
      return res.error(401, '로그인이 필요합니다.', 'Unauthorized');
    }
    const culture = await prisma.culturePost.delete({
      where: { id, authorId },
    });

    fetch(`${process.env.AI_API_URL}/update-cache?user_id=${authorId}`, {
      method: 'POST',
    });
    res.success(culture);
  } catch (error) {
    console.error(error);
    res.error(500, "기록을 삭제하는 중 오류가 발생했습니다.", error.message);
  }
};