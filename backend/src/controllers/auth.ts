import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { AppDataSource } from '../config/db.js';
import { User } from '../entities/User.js';
import { UserRole } from '../constants.js';

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user

    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const register = async (
  req: Request<{}, {}, any>,
  res: Response
): Promise<Response | void> => {
  const { email, username, password } = req.body;

  const userrepo = AppDataSource.getRepository(User);
  const exists = await userrepo.findOne({where:
    [
      {email},
      {username}
    ]
    });

  

  if (exists) {
    return res
      .status(409)
      .json({ message: 'Email or username already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = {
    email,
    username,
    password_hash: hashed,
    role: UserRole.USER  };

  const saveduser= await userrepo.save(user)
  const { password_hash: _, ...safeUser } = saveduser;

  return res.status(201).json({ user: safeUser });
};

export const login = async (
  req: Request<{}, {}, any>,
  res: Response
): Promise<Response | void> => {
  const { email, password } = req.body;
  const userrepo = AppDataSource.getRepository(User);

  const user = await userrepo.findOne({where:{email}})

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
console.log("______________________",process.env.JWT_SECRET)
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '7d',
    }
  );

  const { password_hash: _, ...safeUser } = user;

  return res.json({
    token,
    user: safeUser,
  });
};

export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { username, bio, avatar_url } = req.body;

    const userRepo = AppDataSource.getRepository(User);

    if (username && username !== user.username) {
      const exists = await userRepo.findOne({ where: { username } });
      if (exists) {
        return res.status(409).json({ message: 'Bu username artıq mövcuddur' });
      }
    }

    await userRepo.update(user.id, {
      ...(username && { username }),
      ...(bio !== undefined && { bio }),
      ...(avatar_url !== undefined && { avatar_url }),
    });

    const updated = await userRepo.findOne({ where: { id: user.id } });
    const { password_hash: _, ...safeUser } = updated!;

    return res.status(200).json({ user: safeUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
