import { Request, Response } from 'express';
import { AppDataSource } from '../config/db.js';
import { Post } from '../entities/Post.js';
import { UserRead } from '../entities/UserRead.js';

export const markAsRead = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const postId = Number(req.params.id);
    const user = (req as any).user;

    const postRepo = AppDataSource.getRepository(Post);
    const userReadRepo = AppDataSource.getRepository(UserRead);

    const post = await postRepo.findOne({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    const existingRead = await userReadRepo.findOne({
      where: {
        user_id: user.id,
        post_id: postId,
      },
    });

    if (existingRead) {
      return res.status(409).json({
        message: 'Post already marked as read',
      });
    }

    const userRead = userReadRepo.create({
      user_id: user.id,
      post_id: postId,
    });

    await userReadRepo.save(userRead);

    post.view_count += 1;
    await postRepo.save(post);

    return res.status(201).json({
      message: 'Post marked as read',
      userRead,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error',
    });
  }
};

export const getUserReads = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const user = (req as any).user;

    const userReadRepo = AppDataSource.getRepository(UserRead);

    const reads = await userReadRepo.find({
      where: { user_id: user.id },
      order: { created_at: 'DESC' },
    });

    return res.status(200).json({
      reads,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error',
    });
  }
};