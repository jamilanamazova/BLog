import { Request, Response } from 'express';
import { In } from 'typeorm';
import { AppDataSource } from '../config/db.js';
import { Comment } from '../entities/Comment.js';
import { Post } from '../entities/Post.js';
import { User } from '../entities/User.js';

export const getComments = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const postId = Number(req.params.id);

    const commentRepo = AppDataSource.getRepository(Comment);
    const userRepo = AppDataSource.getRepository(User);

    const allComments = await commentRepo.find({
      where: { post_id: postId },
      order: { created_at: 'ASC' },
    });

    const userIds = [...new Set(allComments.map((c) => c.user_id))];
    const users = userIds.length ? await userRepo.findBy({ id: In(userIds) }) : [];
    const userMap = new Map(users.map((u) => [u.id, u]));

    const toDto = (c: Comment) => ({
      id: c.id,
      post_id: c.post_id,
      parent_id: c.parent_id,
      content: c.content,
      created_at: c.created_at,
      user: userMap.has(c.user_id)
        ? { id: userMap.get(c.user_id)!.id, username: userMap.get(c.user_id)!.username }
        : null,
    });

    const topLevel = allComments.filter((c) => !c.parent_id);
    const repliesByParent = new Map<number, Comment[]>();
    allComments
      .filter((c) => c.parent_id)
      .forEach((c) => {
        const arr = repliesByParent.get(c.parent_id as number) || [];
        arr.push(c);
        repliesByParent.set(c.parent_id as number, arr);
      });

    const nested = topLevel.map((c) => ({
      ...toDto(c),
      replies: (repliesByParent.get(c.id) || []).map(toDto),
    }));

    return res.status(200).json({ comments: nested });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createComment = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const postId = Number(req.params.id);
    const { content, parent_id } = req.body;

    const postRepo = AppDataSource.getRepository(Post);
    const commentRepo = AppDataSource.getRepository(Comment);

    const post = await postRepo.findOne({ where: { id: postId } });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (parent_id) {
      const parentComment = await commentRepo.findOne({
        where: { id: Number(parent_id), post_id: postId },
      });
      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }
    }

    const user = (req as any).user;

    const comment = commentRepo.create({
      post_id: postId,
      user_id: user.id,
      parent_id: parent_id ? Number(parent_id) : null,
      content,
    });

    const savedComment = await commentRepo.save(comment);
    post.comment_count += 1;
    await postRepo.save(post);

    return res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};