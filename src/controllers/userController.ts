import { Request, Response } from 'express';
import User from '../models/user';

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?.userId).select('-password');
  if (!user){

    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json(user);
};

export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  const { name, bio, skills, goals } = req.body;

  const updated = await User.findByIdAndUpdate(
    req.user?.userId,
    { name, bio, skills, goals },
    { new: true }
  ).select('-password');

  if (!updated) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json(updated);
};
