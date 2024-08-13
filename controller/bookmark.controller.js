const prisma = require('../lib/prisma');

exports.toggleBookmark = async (req, res) => {
    try {
        const { postId } = req.body;
        if (!postId) {
            return res.error(400, '게시물 ID가 필요합니다.', '게시물 ID가 필요합니다.');
        }
        if (!req.user || !req.user.id) {
            return res.error(401, '로그인이 필요합니다.', '로그인이 필요합니다.');
        }
        const userId = req.user.id;

        const result = await prisma.$transaction(async (prisma) => {
            const prevBookmark = await prisma.bookmark.findFirst({
                where: {
                    userId,
                    postId
                }
            });

            if (prevBookmark) {
                const bookmark = await prisma.bookmark.delete({
                    where: {
                        id: prevBookmark.id
                    }
                });
                return { added: false, bookmark };
            } else {
                const bookmark = await prisma.bookmark.create({
                    data: {
                        userId,
                        postId
                    }
                });
                return { added: true, bookmark };
            }
        });
        res.success(result);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2003') {  // 외래 키 제약 조건 위반
            return res.error(400, '게시물 또는 사용자를 찾지 못하였습니다.', error.message);
        }

        res.error(500, '북마크를 설정하는 중 오류가 발생했습니다.', error.message);
    }
};

exports.getMyBookmarks = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.error(401, '로그인이 필요합니다.', '로그인이 필요합니다.');
        }
        const userId = req.user.id;

        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                post: {
                    include: {
                        photos: true,
                    }
                }
            }
        });

        res.success(bookmarks);
    } catch (error) {
        res.error(500, '북마크를 가져오는 중 오류가 발생했습니다.', error.message);
    }
}