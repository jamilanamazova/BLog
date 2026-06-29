import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/db';
import { User } from '../entities/User';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Token yoxdur'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userrepo = AppDataSource.getRepository(User);
    const user = await userrepo.findOne({ where: { id: (decoded as { id: number }).id } });

    if (!user) {
      return res.status(401).json({
        message: 'İstifadəçi tapılmadı, yenidən daxil olun'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      message: 'Token etibarsızdır'
    });
  }
};

export default authMiddleware;