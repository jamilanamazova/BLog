import { Request, Response } from 'express';
import { AppDataSource } from '../config/db.js';
import { Favorite } from '../entities/Favorite.js';
import { Post } from '../entities/Post.js';

export const addFavorite = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const postId = Number(req.params.id);
    const user = (req as any).user;

    const postRepo = AppDataSource.getRepository(Post);
    const favoriteRepo = AppDataSource.getRepository(Favorite);

    const post = await postRepo.findOne({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    const existingFavorite = await favoriteRepo.findOne({
      where: {
        user_id: user.id,
        post_id: postId,
      },
    });

    if (existingFavorite) {
      return res.status(409).json({
        message: 'Post already in favorites',
      });
    }

    const favorite = favoriteRepo.create({
      user_id: user.id,
      post_id: postId,
    });

    await favoriteRepo.save(favorite);

    post.favorite_count += 1;
    await postRepo.save(post);

    return res.status(201).json({
      message: 'Added to favorites',
      favorite,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error',
    });
  }
};

export const getFavorites = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const user = (req as any).user;
    const favoriteRepo = AppDataSource.getRepository(Favorite);

    const favorites = await favoriteRepo.find({
      where: { user_id: user.id },
      order: { created_at: 'DESC' },
    });

    const postRepo = AppDataSource.getRepository(Post);
    const postIds = favorites.map((f) => f.post_id);

    if (postIds.length === 0) {
      return res.status(200).json({ posts: [] });
    }

    const posts = await postRepo
      .createQueryBuilder('post')
      .where('post.id IN (:...ids)', { ids: postIds })
      .getMany();

    return res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const removeFavorite = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const postId = Number(req.params.id);
    const user = (req as any).user;

    const favoriteRepo = AppDataSource.getRepository(Favorite);
    const postRepo = AppDataSource.getRepository(Post);

    const favorite = await favoriteRepo.findOne({
      where: { user_id: user.id, post_id: postId },
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    await favoriteRepo.remove(favorite);

    const post = await postRepo.findOne({ where: { id: postId } });
    if (post && post.favorite_count > 0) {
      post.favorite_count -= 1;
      await postRepo.save(post);
    }

    return res.status(200).json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};