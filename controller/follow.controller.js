const prisma = require('../lib/prisma');
const { FollowRequestStatus } = require('@prisma/client');
const { exclude } = require('../utils/excludeField');

exports.sendFollowRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId } = req.body;
    const followRequest = await prisma.followRequest.create({
      data: {
        fromUserId: senderId,
        toUserId: parseInt(receiverId),
      },
    });
    res.status(200).json(followRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.acceptFollowRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const followRequest = await prisma.followRequest.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: FollowRequestStatus.ACCEPTED,
      },
    });
    if (followRequest.toUserId !== req.user.id) {
      const followRequest = await prisma.followRequest.update({
        where: {
          id: parseInt(id),
        },
        data: {
          status: FollowRequestStatus.PENDING,
        },
      });
      res.status(401).json({ error: 'You are not authorized' });
      return;
    }
    const follow = await prisma.follow.create({
      data: {
        followerId: followRequest.fromUserId,
        followingId: followRequest.toUserId,
      },
    });
    res.status(200).json(followRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.rejectFollowRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const followRequest = await prisma.followRequest.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: FollowRequestStatus.REJECTED,
      },
    });
    if (followRequest.toUserId !== req.user.id) {
      const followRequest = await prisma.followRequest.update({
        where: {
          id: parseInt(id),
        },
        data: {
          status: FollowRequestStatus.PENDING,
        },
      });
      res.status(401).json({ error: 'You are not authorized' });
      return;
    }
    res.status(200).json(followRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMyFollowRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const followRequest = await prisma.followRequest.findMany({
      where: {
        toUserId: userId,
      },
    });
    res.status(200).json(followRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMyPendingRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const followRequest = await prisma.followRequest.findMany({
      where: {
        toUserId: userId,
        status: FollowRequestStatus.PENDING,
      },
    });
    res.status(200).json(followRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMyFollowRequestSent = async (req, res) => {
  try {
    const userId = req.user.id;
    const followRequest = await prisma.followRequest.findMany({
      where: {
        fromUserId: userId,
      },
    });
    res.status(200).json(followRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMyFollowers = async (req, res) => {
  try {
    const userId = req.user.id;
    const followers = await prisma.follow.findMany({
      where: {
        followingId: parseInt(userId),
      },
      include: {
        follower: true,
      },
    });
    const filteredFollowers = followers.map((follower) => {
      const followerWithoutPassword = exclude(follower.follower, ['password']);
      return { ...follower, follower: followerWithoutPassword };
    });
    res.status(200).json(filteredFollowers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMyFollwings = async (req, res) => {
  try {
    const userId = req.user.id;
    const followings = await prisma.follow.findMany({
      where: {
        followerId: parseInt(userId),
      },
      include: {
        following: true,
      },
    });
    const filteredFollowings = followings.map((following) => {
      const followingWithoutPassword = exclude(following.following, [
        'password',
      ]);
      return { ...following, following: followingWithoutPassword };
    });
    res.status(200).json(filteredFollowings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
