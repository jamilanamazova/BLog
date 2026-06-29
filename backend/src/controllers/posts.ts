import { Request, Response } from 'express';
import { AppDataSource } from '../config/db.js';
import jwt from 'jsonwebtoken';
import { Post } from '../entities/Post.js';
import { User } from '../entities/User.js';
import { Like } from '../entities/Like.js';
import { Favorite } from '../entities/Favorite.js';

export const getPosts = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const postRepo = AppDataSource.getRepository(Post);
        const userRepo = AppDataSource.getRepository(User);
        const likeRepo = AppDataSource.getRepository(Like);
        const favoriteRepo = AppDataSource.getRepository(Favorite);

        const posts = await postRepo.find({ order: { id: 'DESC' } });

        // Token varsa user-i tap
        let userId: number | null = null;
        const authHeader = req.headers.authorization;
        if (authHeader) {
            try {
                const token = authHeader.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
                userId = decoded.id;
            } catch {}
        }

        // User-in like/favorite etdiyi post id-ləri
        let likedIds = new Set<number>();
        let favoritedIds = new Set<number>();
        if (userId) {
            const likes = await likeRepo.find({ where: { user_id: userId } });
            const favs = await favoriteRepo.find({ where: { user_id: userId } });
            likedIds = new Set(likes.map(l => l.post_id));
            favoritedIds = new Set(favs.map(f => f.post_id));
        }

        const postsWithMeta = await Promise.all(
            posts.map(async (post) => {
                const author = await userRepo.findOne({ where: { id: post.author_id } });
                return {
                    ...post,
                    author: author
                        ? { id: author.id, username: author.username, avatar_url: author.avatar_url }
                        : null,
                    isLiked: likedIds.has(post.id),
                    isFavorited: favoritedIds.has(post.id),
                };
            })
        );

        return res.status(200).json({ posts: postsWithMeta });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getPostById = async (
    req: Request,
    res: Response
): Promise<Response | void> => {
    try {
        const postId = Number(req.params.id);

        const postRepo = AppDataSource.getRepository(Post);
        const userRepo = AppDataSource.getRepository(User);

        const post = await postRepo.findOne({
            where: { id: postId },
        });

        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        post.view_count += 1;
        await postRepo.save(post);

        const author = await userRepo.findOne({ where: { id: post.author_id } });

        return res.status(200).json({
            post: {
                ...post,
                author: author ? { id: author.id, username: author.username } : null,
            },
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Server error',
        });
    }
};

export const createPost = async (
    req: Request,
    res: Response
): Promise<Response | void> => {
    try {
        const { title, content, image_url, category } = req.body;

        const user = (req as any).user;

        if (!title || !content) {
            return res.status(400).json({
                message: 'Title and content are required',
            });
        }

        const postRepo = AppDataSource.getRepository(Post)

        const post = postRepo.create({
            title,
            content,
            image_url,
            category,
            author_id: user.id,
        });
        await postRepo.save(post);

        return res.status(201).json({
            message: 'Post created',
            post,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Server error',
        });
    }
};


export const getMyPosts = async (
    req: Request,
    res: Response
): Promise<Response | void> => {
    try {
        const user = (req as any).user;

        const postRepo = AppDataSource.getRepository(Post);

        const posts = await postRepo.find({
            where: { author_id: user.id },
            order: { id: 'DESC' },
        });

        return res.status(200).json({
            posts,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Server error',
        });
    }
};