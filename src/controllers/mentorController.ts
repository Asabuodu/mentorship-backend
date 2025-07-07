import { Request, Response } from 'express';
import User from '../models/user';

export const listMentors = async (req: Request, res: Response) => {
  const { skill, industry } = req.query;

  let filters: any = { role: 'mentor' };

  if (skill) {
    filters.skills = { $in: [skill] };
  }

  if (industry) {
    filters.industry = industry;
  }

  const mentors = await User.find(filters).select('-password');

  res.json(mentors);
};
