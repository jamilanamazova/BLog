import { Router } from 'express';
import { getLikedPosts, likePost, unlikePost } from '../controllers/like.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.get('/posts/liked', authMiddleware, getLikedPosts);

router.post(
  '/posts/:id/like',
  authMiddleware,
  likePost
);

router.delete('/posts/:id/like', authMiddleware, unlikePost);

export default router;