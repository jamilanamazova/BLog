import { Request, Response } from 'express';
import { AppDataSource } from '../config/db.js';
import { Like } from '../entities/Like.js';
import { Post } from '../entities/Post.js';
import { In } from 'typeorm';

export const likePost = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const postId = Number(req.params.id);
    const user = (req as any).user;

    const postRepo = AppDataSource.getRepository(Post);
    const likeRepo = AppDataSource.getRepository(Like);

    const post = await postRepo.findOne({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    const existingLike = await likeRepo.findOne({
      where: {
        user_id: user.id,
        post_id: postId,
      },
    });

    if (existingLike) {
      return res.status(409).json({
        message: 'You already liked this post',
      });
    }

    const like = likeRepo.create({
      user_id: user.id,
      post_id: postId,
    });

    await likeRepo.save(like);

    post.like_count += 1;
    await postRepo.save(post);

    return res.status(201).json({
      message: 'Post liked successfully',
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error',
    });
  }
};

export const getLikedPosts = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const user = (req as any).user;
    const likeRepo = AppDataSource.getRepository(Like);

    const likes = await likeRepo.find({
      where: { user_id: user.id },
      order: { created_at: 'DESC' },
    });

    const postIds = likes.map(l => l.post_id);

    if (postIds.length === 0) {
      return res.status(200).json({ posts: [] });
    }

    const postRepo = AppDataSource.getRepository(Post);
    const posts = await postRepo.findBy({ id: In(postIds) });

    return res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const unlikePost = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const postId = Number(req.params.id);
    const user = (req as any).user;

    const likeRepo = AppDataSource.getRepository(Like);
    const postRepo = AppDataSource.getRepository(Post);

    const like = await likeRepo.findOne({
      where: { user_id: user.id, post_id: postId },
    });

    if (!like) {
      return res.status(404).json({ message: 'Like not found' });
    }

    await likeRepo.remove(like);

    const post = await postRepo.findOne({ where: { id: postId } });
    if (post && post.like_count > 0) {
      post.like_count -= 1;
      await postRepo.save(post);
    }

    return res.status(200).json({ message: 'Like removed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};