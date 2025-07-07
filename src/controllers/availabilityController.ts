import { Request, Response } from 'express';
import Availability from '../models/Availability';

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

// Add availability block
export const addAvailability = async (req: AuthRequest, res: Response) => {
  const { dayOfWeek, startTime, endTime } = req.body;

  const exists = await Availability.findOne({
    mentor: req.user?.userId,
    dayOfWeek,
    startTime,
    endTime,
  });

  if (exists){
     res.status(400).json({ error: 'This time block already exists' });
      return;
  } 

  const availability = await Availability.create({
    mentor: req.user?.userId,
    dayOfWeek,
    startTime,
    endTime,
  });

  res.status(201).json(availability);
};

// Get availability blocks for mentor
export const getMyAvailability = async (req: AuthRequest, res: Response) => {
  const blocks = await Availability.find({ mentor: req.user?.userId });
  res.json(blocks);
};

// Delete an availability block
export const deleteAvailability = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const deleted = await Availability.findOneAndDelete({
    _id: id,
    mentor: req.user?.userId,
  });

  if (!deleted){
    
     res.status(404).json({ error: 'Not found or unauthorized' });
      return;
  }

  res.json({ message: 'Availability deleted' });
};
