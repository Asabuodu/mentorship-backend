import { Request, Response } from 'express';
import User from '../models/user';

import MentorshipRequest from '../models/Request';
import Session from '../models/Session';

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

// Get all users
export const getAllUsers = async (req: AuthRequest, res: Response) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// Update a user's role (e.g., promote to mentor)
// export const updateUserRole = async (req: AuthRequest, res: Response) => {
//   const { id } = req.params;
//   const { role } = req.body;

//   if (!['admin', 'mentor', 'mentee'].includes(role)) {
//    return res.status(400).json({ error: 'Invalid role' });
    
//   }

//   const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
//   if (!updatedUser) return res.status(404).json({ error: 'User not found' });

//   res.json(updatedUser);
// };


export const updateUserRole = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['admin', 'mentor', 'mentee'].includes(role)) {
   
     res.status(400).json({ error: 'Invalid role' });
      return;
  }

  const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');

  if (!updatedUser) {
    
    res.status(404).json({ error: 'User not found' });
    return;
  } 


  res.json(updatedUser);
};


// View all mentorship requests (optional: for reporting)
export const getAllRequests = async (req: AuthRequest, res: Response) => {
  const requests = await MentorshipRequest.find()
    .populate('mentor', 'name email')
    .populate('mentee', 'name email');
  res.json(requests);
};

// View all sessions
export const getAllSessions = async (req: AuthRequest, res: Response) => {
  const sessions = await Session.find()
    .populate('mentor', 'name email')
    .populate('mentee', 'name email');
  res.json(sessions);
};
