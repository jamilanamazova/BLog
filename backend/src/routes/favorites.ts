import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favorites.js';

const router = Router();
router.get('/favorites/me', authMiddleware, getFavorites);

router.post(
  '/:id/favorite',
  authMiddleware,
  addFavorite
);

router.delete('/:id/favorite', authMiddleware, removeFavorite);

export default router;