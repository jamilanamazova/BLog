import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { markAsRead, getUserReads } from '../controllers/userread.js';

const router = Router();

router.post(
  '/:id/read',
  authMiddleware,
  markAsRead
);

router.get(
  '/reads',
  authMiddleware,
  getUserReads
);

export default router;