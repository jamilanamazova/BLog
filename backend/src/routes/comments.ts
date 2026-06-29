import { Router } from 'express';
import { createComment, getComments } from '../controllers/comment.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.get('/posts/:id/comments', getComments);
router.post('/posts/:id/comments', authMiddleware, createComment);

export default router;