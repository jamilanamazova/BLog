import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getPosts, getPostById, createPost, getMyPosts } from '../controllers/posts.js';

const router = Router();

router.get('/my-posts', authMiddleware, getMyPosts);

router.get('/', getPosts);

router.get('/:id', getPostById);

router.post('/', authMiddleware, createPost);

export default router;